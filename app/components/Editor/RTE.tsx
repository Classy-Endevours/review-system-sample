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
  BtnStyles,
  BtnUnderline,
  BtnUndo,
  ContentEditableEvent,
  createButton,
  Editor,
  EditorProvider,
  HtmlButton,
  Separator,
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

  //   return <Markdown value={data} onChange={handleChange} />;
  const BtnImageUpload = createButton('Align center', '≡', 'justifyCenter');
  return (
    <div>
      <EditorProvider>
        <Editor value={data} onChange={handleChange}>
          <Toolbar className="w-full">
            <div>
              <BtnUndo />
              <BtnRedo />
              <Separator />
              <BtnBold />
              <BtnItalic />
              <BtnUnderline />
              <BtnImageUpload/>
            </div>
            <div>
              <BtnStrikeThrough />
              <Separator />
              <BtnNumberedList />
              <BtnBulletList />
              <Separator />
              <BtnLink />
            </div>
            <div>
              <BtnClearFormatting />
              <HtmlButton />
              <Separator />
              <BtnStyles />
            </div>
          </Toolbar>
        </Editor>
      </EditorProvider>
    </div>
  );
};

export default RTE;
