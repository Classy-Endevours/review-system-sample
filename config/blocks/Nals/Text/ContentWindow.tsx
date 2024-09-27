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

const Image = ({
  gapX,
  gapY,
  color,
  justify,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text?: string;
  column2Text?: string;
  justify: string;
}) => {
  return (
    <div>
      <div
        style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
        className={`flex justify-between gap-x-4  text-${justify}`}
      >
        <div className="py-4">
          {[1, 2, 3].map((_, idx) => (
            <div className="my-4" key={idx}>
              <img src="/nals/nals-1-image.jpg" />
            </div>
          ))}
        </div>
        <div className="py-4">
          {[1, 2, 3].map((_, idx) => (
            <div className="my-4" key={idx}>
              <img src="/nals/nals-2-image.jpg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
