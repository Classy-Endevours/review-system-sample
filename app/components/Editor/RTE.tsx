import React, { useState } from "react";
import {
  BtnBold,
  BtnBulletList,
  BtnClearFormatting,
  BtnItalic,
  BtnLink,
  BtnNumberedList,
  BtnRedo,
  BtnStrikeThrough,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  createButton,
  Editor,
  EditorProvider,
  Toolbar,
} from "react-simple-wysiwyg";

const RTE = ({
  onChange,
  value,
}: {
  value: string;
  onChange: (v: string) => void;
}) => {
  const [data, setData] = useState(value);

  const handleChange = (e: ContentEditableEvent) => {
    const textData = e.target.value;
    setData(textData);
    onChange(textData);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const imageUrl = reader.result as string;
        const newData = `${data}<img src="${imageUrl}" alt="Uploaded Image" />`;
        setData(newData);
        onChange(newData);
      };
      reader.readAsDataURL(file);
    }
  };

  const BtnImageUpload = createButton('Upload Image', '🖼', () => {
    document.getElementById('image-upload')?.click();
  });

  return (
    <div>
      <EditorProvider>
        <Editor value={data} onChange={handleChange}>
          <Toolbar className="w-full">
            <div className="flex flex-wrap justify-evenly py-4">
              <BtnUndo />
              <BtnRedo />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnStrikeThrough />
              <BtnNumberedList />
              <BtnBulletList />
              <BtnLink />
              <BtnImageUpload />
              <BtnClearFormatting />
            </div>
          </Toolbar>
        </Editor>
        <input
          id="image-upload"
          type="file"
          style={{ display: "none" }}
          onChange={handleImageUpload}
          accept="image/*"
        />
      </EditorProvider>
    </div>
  );
};

export default RTE;
