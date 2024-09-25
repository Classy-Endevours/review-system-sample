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

const sizeOptions = [
  { value: "xxxl", label: "XXXL" },
  { value: "xxl", label: "XXL" },
  { value: "xl", label: "XL" },
  { value: "l", label: "L" },
  { value: "m", label: "M" },
  { value: "s", label: "S" },
  { value: "xs", label: "XS" },
];

const fontOptions = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "40", value: 40 },
  { label: "50", value: 50 },
];

const levelOptions = [
  { label: "", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
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
    text: "Third quarter update",
    sub_text: "cont'd...",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: ({
    text,
    padding,
    sub_text,
    fontSize,
    subHeadingFontSize,
    color,
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
              paddingBottom: "10px",
            }}
          >
            {text}
            <span
              style={{
                fontSize: subHeadingFontSize + "px",
                paddingBottom: "10px",
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
