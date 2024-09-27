/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import parse from "html-react-parser"; // Import the HTML parser
import ColorPicker from "@/config/components/ColorPicker";
import {
  fontOptions,
  sizeOptions,
  levelOptions,
} from "../Heading/HeadingLeftAlign";
import { DropZone } from "@measured/puck";
import DraftJs from "@/config/components/RichTextEditor/draftjs";
import { Section } from "@/config/components/Section";

interface PDFPagesProps {
  content: string;
  text: string;
}

const breakIntoColumns = async (
  content: string,
  maxHeight: number
): Promise<string[][]> => {
  const tempDiv = document.createElement("div");
  tempDiv.style.position = "absolute";
  tempDiv.style.visibility = "hidden";
  document.body.appendChild(tempDiv); // Append the tempDiv to the body

  let currentColumn = "";
  const htmlChunks: string[] = [];
  let currentHeight = 0;

  // Parse the HTML into React nodes
  const parsedContent: any = parse(content) || [];

  const measureHeight = (node: any): Promise<any | null> => {
    return new Promise((resolve) => {
      const element = document.createElement("div");
      const root = createRoot(element);
      root.render(node);

      tempDiv.appendChild(element);

      requestAnimationFrame(() => {
        resolve(element.firstChild);
      });
    });
  };

  const processNode = async (node: any) => {
    const element = await measureHeight(node);
    const elementHeight = element?.offsetHeight || 0;
    const outerHTML = element?.outerHTML || "";

    if (currentHeight + elementHeight > maxHeight) {
      // Push current content to a column
      htmlChunks.push(currentColumn);
      currentColumn = outerHTML; // Start a new column with the current element
      currentHeight = elementHeight; // Reset height to the new element's height
    } else {
      currentColumn += outerHTML; // Add element to the current column
      currentHeight += elementHeight;
    }

    // Clean up temporary div content for next iteration
    tempDiv.innerHTML = "";
  };

  let iterator = Array.isArray(parsedContent)
    ? parsedContent
    : parsedContent.props.children;
  iterator = Array.isArray(iterator) ? iterator : [iterator];

  for (const node of iterator) {
    await processNode(node);
  }

  // Push the remaining content into the final column
  if (currentColumn) {
    htmlChunks.push(currentColumn);
  }

  // Remove the temporary div from the DOM
  document.body.removeChild(tempDiv);

  // Split chunks into pages with 2 columns each
  const columns: string[][] = [];
  for (let i = 0; i < htmlChunks.length; i += 2) {
    columns.push([htmlChunks[i], htmlChunks[i + 1] || ""]);
  }

  return columns;
};

const PDFPages: React.FC<PDFPagesProps> = ({ content, text }) => {
  const [pages, setPages] = useState<string[][]>([]);

  useEffect(() => {
    const processContent = async () => {
      const maxHeight = 1000; // Example max height for each column in px
      const columnContent = await breakIntoColumns(content, maxHeight);
      setPages(columnContent);
    };

    processContent(); // Trigger async content processing
  }, [content]);

  return (
    <div className="pdf-container">
      {pages.map((page, pageIndex) => (
        <div
          key={pageIndex}
          className="absolute-page page-container w-full flex flex-col justify-between border"
          style={{ textAlign: "justify" }}
        >
          {/* Header */}
          <DropZone
            zone={`column-header`}
            disallow={["Hero", "Logos", "Stats"]}
          />

          {/* Two-Column Content */}
          {/* <div className="columns-container h-full flex flex-1 px-4 gap-4 text-justify">
            <div
              className="column-1 w-1/2 pr-2 border-r"
              style={{
                width: "50%",
              }}
            >
              <div>{parse(page[0])}</div> 
            </div>
            <div
              className="column-2 w-1/2 pl-2"
              style={{
                width: "50%",
              }}
            >
              <div>{parse(page[1])}</div> 
            </div>
          </div> */}

          <Column text={text} />
          <DropZone
            zone={`column-footer`}
            disallow={["Hero", "Logos", "Stats"]}
          />

          {/* Footer */}
          <div
            className="footer text-center py-2 border-t bg-gray-100"
            style={{ maxHeight: "100px" }}
          >
            <DropZone
              zone={`item-footer`}
              disallow={["Hero", "Logos", "Stats"]}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default PDFPages;

export const A4PageConfig = {
  fields: {
    text: {
      type: "textarea",
    },
    color: {
      type: "custom",
      render: ColorPicker as any,
    },
    richText: {
      type: "custom",
      render: DraftJs,
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
    richText: "<h1>hello</h1><h1>world</h1>",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: (props: any) => (
    <PDFPages content={props.richText} text={props.text} {...props} />
  ),
};

const Text = ({
  text,
  align,
  size,
}: {
  text?: string;
  align?: string | undefined;
  size?: string;
}) => {
  return (
    <span
      style={{
        color: "var(--puck-color-grey-05)",
        display: "flex",
        // textAlign: align,
        width: "100%",
        fontSize: size === "m" ? "20px" : "16px",
        fontWeight: 300,
        maxWidth: "10px",
        marginLeft: "auto",
        marginRight: "auto",
        justifyContent:
          align === "center"
            ? "center"
            : align === "right"
            ? "flex-end"
            : "flex-start",
      }}
    >
      {text}
    </span>
  );
};

const Column = ({ text }: { text: string }) => {
  const columns = [{}, {}];
  return (
    <Section>
      <div
        style={{
          gridTemplateColumns: `repeat(${columns.length}, 1fr)`,
        }}
      >
        {columns.map(({}, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              flexDirection: "column",
              gridColumn: "",
            }}
          >
            <Text text={text} />
          </div>
        ))}
      </div>
    </Section>
  );
};
