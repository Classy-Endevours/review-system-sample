"use client";
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function RichTextEditor({
  onChange,
}: {
  onChange: (v: string) => void;
}) {
  const [value, setValue] = useState("");

  function removeOuterTag(str: string) {
    // Find the index of the first '>' and last '<'
    const firstClose = str.indexOf(">");
    const lastOpen = str.lastIndexOf("<");

    // If we found both opening and closing tags
    if (firstClose !== -1 && lastOpen !== -1 && lastOpen > firstClose) {
      // Return the substring between them
      return str.substring(firstClose + 1, lastOpen);
    }

    // If no valid outer tags were found, return the original string
    return str;
  }

  const handleChange = (e: string) => {
    setValue(e);
    console.log({ before: e });
    const output = removeOuterTag(e);
    onChange(output);
    console.log({ output });
  };

  return <ReactQuill theme="snow" value={value} onChange={handleChange} />;
}
