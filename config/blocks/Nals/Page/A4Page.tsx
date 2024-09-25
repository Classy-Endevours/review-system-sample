/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useState } from "react";
import ColorPicker from "@/config/components/ColorPicker";
import {
  fontOptions,
  levelOptions,
  sizeOptions,
} from "../Heading/HeadingLeftAlign";

interface PdfPagesProps {
    content: string; // Expecting a single string
  }
  
  const PdfPages: React.FC<PdfPagesProps> = ({ content }) => {
    const PAGE_HEIGHT = 1122; // Height in pixels for A4
    const PAGE_WIDTH = 794; // Width in pixels for A4
    const LINES_PER_PAGE = Math.floor(PAGE_HEIGHT / 36); // Approximate lines based on line height (e.g., 36px per line)
  
    const [pages, setPages] = useState<string[][]>([]); // Each page will have two columns
  
    useEffect(() => {
      const formattedPages: string[][] = [];
      const lines = content.split('\n'); // Split the content into lines
      let currentPageContent: string[] = [];
  
      lines.forEach((line) => {
        currentPageContent.push(line);
  
        // Check if we reached the maximum number of lines for a single page
        if (currentPageContent.length === LINES_PER_PAGE) {
          formattedPages.push(currentPageContent);
          currentPageContent = []; // Reset for the next page
        }
      });
  
      // Add any remaining content to the last page
      if (currentPageContent.length) {
        formattedPages.push(currentPageContent);
      }
  
      setPages(formattedPages);
    }, [content]);
  
    return (
      <div className="flex flex-col space-y-5">
        {pages.map((pageContent, index) => {
          // Split the page content into two columns
          const middleIndex = Math.ceil(pageContent.length / 2);
          const leftColumn = pageContent.slice(0, middleIndex);
          const rightColumn = pageContent.slice(middleIndex);
  
          return (
            <div
              style={{ width: PAGE_WIDTH, height: PAGE_HEIGHT }}
              className="border border-black flex flex-col"
              key={index}
            >
              <div className="bg-gray-200 text-center p-2">Header</div>
              <div className="flex flex-1 p-2">
                <div className="w-1/2 pr-2 overflow-hidden break-words">
                  {leftColumn.join('\n')}
                </div>
                <div className="w-1/2 pl-2 overflow-hidden break-words">
                  {rightColumn.join('\n')}
                </div>
              </div>
              <div className="bg-gray-200 text-center p-2">Footer</div>
            </div>
          );
        })}
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
    <PdfPages
      content={props.text}
      {...props}
    />
  ),
};
