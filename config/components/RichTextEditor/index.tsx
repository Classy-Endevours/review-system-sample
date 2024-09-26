import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  AtomicBlockUtils,
  ContentBlock,
  DefaultDraftBlockRenderMap,
} from "draft-js";
import { FaBold, FaItalic, FaUnderline, FaLink, FaImage } from "react-icons/fa";
import { stateToHTML } from "draft-js-export-html";
import Immutable from "immutable";
import "draft-js/dist/Draft.css";

interface RichTextEditorProps {
  onChange: (value: string) => void;
}

const RichTextEditor: React.FC<RichTextEditorProps> = ({ onChange }) => {
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );
  const [urlValue, setUrlValue] = useState("");
  const [isLinkPromptOpen, setIsLinkPromptOpen] = useState(false);
  const editorRef = useRef<Editor>(null);

  // Focus on editor
  const focusEditor = () => editorRef.current?.focus();

  // Handle editor state changes

  // Toggle inline styles like bold, italic, underline
  const toggleInlineStyle = (style: string) => {
    const newState = RichUtils.toggleInlineStyle(editorState, style);
    handleEditorChange(newState); // Call state update once to avoid issues
  };

  // Prompt for inserting link
  const promptForLink = () => {
    setIsLinkPromptOpen(true);
    setUrlValue("");
  };

  // Confirm link and apply it to the selected text
  const confirmLink = (event: React.MouseEvent) => {
    event.preventDefault();
    const contentState = editorState.getCurrentContent();
    const contentStateWithEntity = contentState.createEntity(
      "LINK",
      "MUTABLE",
      { url: urlValue }
    );
    const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
    const newEditorState = EditorState.set(editorState, {
      currentContent: contentStateWithEntity,
    });
    const withLink = RichUtils.toggleLink(
      newEditorState,
      newEditorState.getSelection(),
      entityKey
    );
    handleEditorChange(withLink);
    setIsLinkPromptOpen(false);
  };

  // Remove the link from selected text
  const removeLink = () => {
    const selection = editorState.getSelection();
    if (!selection.isCollapsed()) {
      handleEditorChange(RichUtils.toggleLink(editorState, selection, null));
    }
  };

  // Handle image upload and insert into the editor
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
          "IMAGE",
          "IMMUTABLE",
          { src: reader.result }
        );
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        const newEditorState = AtomicBlockUtils.insertAtomicBlock(
          editorState,
          entityKey,
          " "
        );
        handleEditorChange(newEditorState);
      };
      reader.readAsDataURL(file);
    }
  };

  // Custom block renderer to handle atomic blocks like images
  const blockRendererFn = (block: ContentBlock) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  // Media component to render images
  const Media = (props: any) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return <img src={src} alt="Uploaded" className="max-w-full h-auto" />;
  };

  // Add support for custom atomic blocks like images
  const extendedBlockRenderMap = DefaultDraftBlockRenderMap.merge(
    Immutable.Map({
      atomic: {
        element: "figure",
      },
    })
  );

  return (
    <div
      className="p-4 border border-gray-300 rounded-lg"
      onClick={focusEditor}
    >
      {/* Toolbar */}
      <div className="flex items-center mb-2 space-x-2">
        <button
          type="button"
          className="p-2 hover:bg-gray-200"
          onClick={() => toggleInlineStyle("BOLD")}
        >
          <FaBold />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-gray-200"
          onClick={() => toggleInlineStyle("ITALIC")}
        >
          <FaItalic />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-gray-200"
          onClick={() => toggleInlineStyle("UNDERLINE")}
        >
          <FaUnderline />
        </button>
        <button
          type="button"
          className="p-2 hover:bg-gray-200"
          onClick={promptForLink}
        >
          <FaLink />
        </button>
        <label className="p-2 cursor-pointer hover:bg-gray-200">
          <FaImage />
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageUpload}
          />
        </label>
      </div>

      {/* Link Prompt */}
      {isLinkPromptOpen && (
        <div className="flex items-center mb-2 space-x-2">
          <input
            type="text"
            className="p-2 border border-gray-300 rounded"
            value={urlValue}
            onChange={(e) => setUrlValue(e.target.value)}
            placeholder="Enter URL"
          />
          <button
            onClick={confirmLink}
            className="p-2 bg-blue-500 text-white rounded"
          >
            Confirm
          </button>
          <button
            onClick={removeLink}
            className="p-2 bg-red-500 text-white rounded"
          >
            Remove Link
          </button>
        </div>
      )}

      {/* Draft.js ContentEditable Area */}
      <div className="min-h-[200px] p-2 border border-gray-300 rounded-lg focus:outline-none">
        <Editor
          ref={editorRef}
          editorState={editorState}
          onChange={(e) => handleEditorChange(e, "called")}
          blockRendererFn={blockRendererFn}
          blockRenderMap={extendedBlockRenderMap}
          placeholder="Start typing..."
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
