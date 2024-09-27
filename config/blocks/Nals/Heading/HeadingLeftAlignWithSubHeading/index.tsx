/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";
import { HeadingProps } from "@/config/blocks/Heading";
import ColorPicker from "@/config/components/ColorPicker";

export type LogosProps = {
  logos: {
    alt: string;
    imageUrl: string;
  }[];
};

const fontOptions = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "40", value: 40 },
  { label: "50", value: 50 },
];

export const HeadingLeftAlignWithSubHeading: ComponentConfig<HeadingProps> = {
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
    subHeadingFontSize: {
      type: "select",
      options: fontOptions,
    },

    padding: { type: "text" },
  },
  defaultProps: {
    align: "center",
    text: "Third quarter update",
    sub_text: "cont'd...",
    padding: "24px",
    borderBottom: "2px solid green",
    fontSize: 30,
    subHeadingFontSize: 20
  },
  render: ({
    text,
    padding,
    sub_text,
    fontSize,
    subHeadingFontSize,
    color,
    puck
  }) => {
    return (
      <Section padding={padding}>
        <div style={{ textTransform: "uppercase", textAlign: "left", color }}>
          <span
            style={{
              display: "block",
              textAlign: "left",
              width: "100%",
              letterSpacing: "7px",
              fontSize: fontSize + "px",
              borderBottom: "2px solid #7dba5c",
              paddingBottom: puck.isEditing ? "10px" : "20px",
            }}
          >
            {text}
            <span
              style={{
                fontSize: subHeadingFontSize + "px",
                paddingBottom: puck.isEditing ? "10px" : "20px",
                paddingLeft: "10px",
              }}
            >
              {sub_text}
            </span>
          </span>
        </div>
      </Section>
    );
  },
};
