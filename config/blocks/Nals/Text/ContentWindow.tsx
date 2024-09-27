/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";
import ColorPicker from "@/config/components/ColorPicker";
import RTE from "@/app/components/Editor/RTE";
import { STATIC_CONTENT } from "./content/content";

export type LogosProps = {
  logos: {
    alt: string;
    imageUrl: string;
  }[];
};

export type HeadingProps = {
  align?: "left" | "center" | "right";
  text?: string;
  sub_text?: string;
  padding?: string;
  borderBottom?: string;
  date?: string;
  subtitle?: string;
  fontSize?: string;
  subHeadingFontSize?: number;
  color?: string;
  contentOptions: string;
  justify?: string;
  gapX?: string;
  gapY?: string;
  column1Text: any;
  column2Text: any;
};

export const ContentWindow: ComponentConfig<HeadingProps> = {
  fields: {
    contentOptions: {
      type: "radio",
      options: [
        { label: "Text", value: "text" },
        { label: "Text with Image", value: "textWithImage" },
        { label: "Image", value: "image" },
      ],
    },
    column1Text: {
      type: "custom",
      render: RTE,
      //   render: RTE,
    },
    column2Text: {
      type: "custom",
      render: RTE,
    },
    color: {
      type: "custom",
      render: ColorPicker as any,
    },
    fontSize: {
      type: "text",
    },
    justify: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
    padding: { type: "text" },
    gapX: {
      type: "text",
    },
    gapY: {
      type: "text",
    },
  },
  defaultProps: {
    fontSize: "25px",
    contentOptions: "text",
    column1Text: STATIC_CONTENT.fullPageV1,
    column2Text: STATIC_CONTENT.fullPageV2,
    justify: "justify",
    padding: "24px",
    borderBottom: "2px solid green",
    gapX: "12px",
    gapY: "12px",
  },
  render: ({
    padding,
    color,
    justify,
    contentOptions,
    gapX,
    gapY,
    column1Text,
    column2Text,
    fontSize,
  }) => {
    const RenderContent = {
      text: Text,
      textWithImage: TextWithImage,
      image: Image,
    };
    const Component =
      RenderContent[contentOptions as keyof typeof RenderContent];

    return (
      <Section padding={padding}>
        <Component
          gapX={gapX!}
          gapY={gapY!}
          color={color!}
          justify={justify!}
          column1Text={column1Text!}
          column2Text={column2Text!}
          fontSize={fontSize || '25px'}
        />
      </Section>
    );
  },
};

const Text = ({
  gapX,
  gapY,
  color,
  justify,
  column1Text,
  column2Text,
  fontSize,
}: {
  fontSize: string;
  gapX: string;
  gapY: string;
  color: string;
  column1Text: string;
  column2Text: string;
  justify: string;
}) => {
  return (
    <div
      style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
      // style={{ color }}
      className={`flex justify-between text-${justify}`}
    >
      <div
        dangerouslySetInnerHTML={{ __html: column1Text }}
        style={{ fontSize, width: '48%' }}
        className="w-1/2"
      ></div>

      <div
        style={{ fontSize, width: '48%' }}
        className="w-1/2"
        dangerouslySetInnerHTML={{ __html: column2Text }}
      ></div>
    </div>
  );
};

const TextWithImage = ({
  gapX,
  gapY,
  color,
  justify,
  column1Text,
  column2Text,
  fontSize,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text: string;
  column2Text: string;
  justify: string;
  fontSize: string;
}) => {
  return (
    <div
      id="xtssd"
      style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
      className={`flex justify-between gap-x-4 text-${justify}`}
    >
      <div
        style={{ fontSize, width: '48%' }}
      >
        <div
          style={{ fontSize }}
          dangerouslySetInnerHTML={{ __html: column1Text }}
        ></div>
        <div>
          <img src="/nals/nals-1-image.jpg" width={"100%"} alt="" />
        </div>
      </div>
      <div className="w-1/2" style={{ width: '48%' }}>

        <div>
          <img src="/nals/nals-1-image.jpg" width={"100%"} alt="" />
        </div>
        <div
          style={{ fontSize }}
          dangerouslySetInnerHTML={{ __html: column2Text }}
        ></div>
      </div>
    </div>
  );
};


const Image= ({
  gapX,
  gapY,
  color
}: {
  gapX: string;
  gapY: string;
  color: string;
  justify: string;
}) => {
  // Define image links at the top of the file
  const image1 = "https://plus.unsplash.com/premium_photo-1670076513880-f58e3c377903?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MXx8ZnVybml0dXJlfGVufDB8fDB8fHww";
  const image2 = "https://images.unsplash.com/photo-1519710164239-da123dc03ef4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8ZnVybml0dXJlfGVufDB8fDB8fHww";
  const image4 = "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D";
  const image5 = "https://images.unsplash.com/photo-1489269637500-aa0e75768394?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTZ8fGZ1cm5pdHVyZXxlbnwwfHwwfHx8MA%3D%3D";

  return (
    <div id="image-container" className={`w-full h-screen`} style={{ gap: `${gapY || "10"}px ${gapX || "10"}px`, color }}>
      {/* First row: full-width image with 50% screen height */}
      <div className="w-full">
        <img src={image1} width={"100%"} alt="Image 1" />
      </div>

      {/* Second row: two columns */}
      <div className="w-full h-1/2 flex" style={{ gap: `10px` }}>
        {/* First column with two 25% height images */}
        <div className="w-[50%] flex flex-col" style={{ width: "50%", gap: `10px` }}>
          <div className="w-full h-1/4">
            <img src={image2} width={"100%"}  className="w-full h-full" alt="Image 2" />
          </div>
        </div>

        {/* Second column with one 75% height image and one 25% height image */}
        <div className="w-[50%] flex flex-col justify-around" style={{ width: "50%", gap: `10px` }}>
          <div className="w-full">
            <img src={image4} width={"100%"}  className="w-full h-full" alt="Image 4" />
          </div>
          <div className="w-full">
            <img src={image5} width={"100%"}  className="w-full h-full " alt="Image 5" />
          </div>
        </div>
      </div>
    </div>
  );
};


