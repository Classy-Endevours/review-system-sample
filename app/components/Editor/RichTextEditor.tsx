"use client";
import { generateRandomParagraph } from "@/lib/get-content";
import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";

type RichTextEditorProps = {
  goToNext: () => void;
  customNextButton?: string;
  value?: string;
};

const RichTextEditor = ({ goToNext, customNextButton, value: initialValue }: RichTextEditorProps) => {

  const [value, setValue] = useState(initialValue || generateRandomParagraph(15));

  // Update the state if the initialValue changes
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="h-[12vh]">
      <div className="flex justify-end mt-2">
        <Button onClick={goToNext} colorScheme="green">
          {customNextButton ? customNextButton : "Next"}
        </Button>
      </div>
      <div className="p-2 h-[10vh]">
        <Editor
          value={value}
          containerProps={{ style: { height: "50vh", overflow: "scroll" } }}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
