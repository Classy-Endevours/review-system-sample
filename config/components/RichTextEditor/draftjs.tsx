/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useRef } from "react";
import {
  Editor,
  EditorState,
  RichUtils,
  DraftHandleValue,
  AtomicBlockUtils,
  ContentBlock,
  ContentState,
  convertFromHTML,
} from "draft-js";
import "draft-js/dist/Draft.css";
import { stateToHTML } from "draft-js-export-html";

import { FaBold, FaItalic, FaUnderline, FaImage } from "react-icons/fa";

interface RichTextEditorProps {
  onChange: (value: string) => void;
  value?: string;
}

const DraftJs: React.FC<RichTextEditorProps> = ({
  onChange,
  value: initialHtml,
}) => {
  const [editorState, setEditorState] = useState<EditorState>(
    EditorState.createEmpty()
  );
  const editorRef = useRef<Editor | null>(null); // Reference for the Editor

  const isInitialized = useRef(false); // Track if the editor has been initialized

  // Initialize EditorState only once
  if (!isInitialized.current && initialHtml) {
    const contentBlock = convertFromHTML(initialHtml);
    const contentState = ContentState.createFromBlockArray(
      contentBlock.contentBlocks
    );
    setEditorState(EditorState.createWithContent(contentState));
    isInitialized.current = true; // Set initialized to true
  }

  const handleEditorStateChange = (state: EditorState) => {
    const content = state.getCurrentContent();
    const contentAsHTML = stateToHTML(content);
    onChange(contentAsHTML);
    setEditorState(state);
  };

  const handleKeyCommand = (command: string): DraftHandleValue => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      setEditorState(newState);
      return "handled";
    }
    return "not-handled";
  };

  const toggleInlineStyle = (style: string) => {
    setEditorState(RichUtils.toggleInlineStyle(editorState, style));
  };

  const focusEditor = () => {
    if (editorRef.current) {
      editorRef.current.focus(); // Focus the editor
    }
  };

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
        handleEditorStateChange(newEditorState);
      };
      reader.readAsDataURL(file);
    }
  };

  const Media = (props: any) => {
    const entity = props.contentState.getEntity(props.block.getEntityAt(0));
    const { src } = entity.getData();
    return <img src={src} alt="Uploaded" className="max-w-full h-auto" />;
  };

  const blockRendererFn = (block: ContentBlock) => {
    if (block.getType() === "atomic") {
      return {
        component: Media,
        editable: false,
      };
    }
    return null;
  };

  return (
    <div className="max-w-2xl mx-auto p-4 border border-gray-300 rounded-lg shadow-md">
      <div className="mb-4 flex">
        <button
          className="p-2 hover:bg-gray-200"
          onClick={() => toggleInlineStyle("BOLD")}
        >
          <FaBold />
        </button>
        <button
          className="p-2 hover:bg-gray-200"
          onClick={() => toggleInlineStyle("ITALIC")}
        >
          <FaItalic />
        </button>
        <button
          className="p-2 hover:bg-gray-200"
          onClick={() => toggleInlineStyle("UNDERLINE")}
        >
          <FaUnderline />
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
      <div
        className="min-h-[200px] border border-gray-300 p-2 cursor-text"
        onClick={focusEditor}
      >
        <Editor
          editorState={editorState}
          handleKeyCommand={handleKeyCommand}
          blockRendererFn={blockRendererFn}
          onChange={handleEditorStateChange}
          placeholder="Start typing..."
          ref={editorRef} // Assign ref to Editor
        />
      </div>
    </div>
  );
};

export default DraftJs;
