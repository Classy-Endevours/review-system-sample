'use client'
import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export function RichTextEditor() {
  const [value, setValue] = useState("");
  console.log({value})

  return <ReactQuill theme="snow" value={value} onChange={setValue} />;
}
