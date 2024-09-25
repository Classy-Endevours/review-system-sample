/* eslint-disable @typescript-eslint/no-explicit-any */
import ColorPicker from "@/config/components/ColorPicker";
import React, { useState, useEffect } from "react";
import { fontOptions, sizeOptions, levelOptions } from "../Heading/HeadingLeftAlign";

// Define a type for the props
interface PDFPagesProps {
  content: string | JSX.Element;
}

// Utility to split text content into manageable chunks
const splitTextContent = (content: string, chunkSize: number) => {
  const words = content.split(" ");
  const chunks: string[] = [];
  let chunk = "";
  for (let i = 0; i < words.length; i++) {
    chunk += words[i] + " ";
    if (i % chunkSize === 0 && i !== 0) {
      chunks.push(chunk.trim());
      chunk = "";
    }
  }
  if (chunk) chunks.push(chunk.trim());
  return chunks;
};

// The main PDFPages component
const PDFPages: React.FC<PDFPagesProps> = ({ content }) => {
  const [pages, setPages] = useState<string[][]>([]);

  useEffect(() => {
    // Simulate splitting content into chunks for pages and columns
    const chunkSize = 900; // Increased chunk size to fill the page better
    const contentArray = typeof content === "string" ? splitTextContent(content, chunkSize) : [content.toString()];

    const formattedPages: string[][] = [];
    for (let i = 0; i < contentArray.length; i += 2) {
      const pageContent: string[] = [
        contentArray[i], // First column
        contentArray[i + 1] || "", // Second column
      ];
      formattedPages.push(pageContent);
    }
    setPages(formattedPages);
  }, [content]);

  return (
    <div className="pdf-container">
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="absolute-page page-container w-full flex flex-col justify-between border"
          style={
            {
              textAlign: 'justify'
            }
          }
        >
          {/* Header */}
          <div className="header text-center py-2 border-b bg-gray-100" style={{
            'maxHeight': "100px"
          }}>
            <h2>Header</h2>
            <h2>Header</h2>
            <h2>Header</h2>
          </div>

          {/* Two-Column Content */}
          <div className="columns-container h-full flex flex-1 px-4 gap-4 text-justify">
            <div className="column-1 w-1/2 pr-2 border-r">
              <p>{page[0]}</p>
            </div>
            <div className="column-2 w-1/2 pl-2">
              <p>{page[1]}</p>
            </div>
          </div>

          {/* Footer */}
          <div className="footer text-center py-2 border-t bg-gray-100" style={{
            'maxHeight': "100px"
          }}>
            <h2>Footer</h2>
            <h2>Footer</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export const A4PageConfig = {
  fields: {
    text: {
      type: "textarea",
    },
    color: {
      type: "custom",
      render: ColorPicker as any,
    },
    fontSize: {
      type: "select",
      options: fontOptions,
    },
    size: {
      type: "select",
      options: sizeOptions,
    },
    level: {
      type: "select",
      options: levelOptions,
    },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
    padding: { type: "text" },
  },
  defaultProps: {
    align: "center",
    text: "Sold property distributions",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: (props: any) => (
    <PDFPages
      content={props.text}
      {...props}
    />
  ),
};
