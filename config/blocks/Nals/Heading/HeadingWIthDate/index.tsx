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


export const HeadingWithDate: ComponentConfig<HeadingProps> = {
  fields: {
    text: {
      type: "text",
    },
    date: {
      type: "text",
    },
    color: {
      type: "custom",
      render: ColorPicker as any,
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
    date: "october 15, 2023",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: ({ align, text, padding, date, color, puck }) => {
    return (
      <Section padding={padding}>
        <div style={{ textTransform: "uppercase", textAlign: "center", color }}>
          <span
            style={{
              display: "inline",
              textAlign: align,
              width: "100%",
              letterSpacing: "7px",
              fontSize: "55px",
              borderBottom: "2px solid #7dba5c",
              paddingBottom: puck.isEditing ? "10px" : "20px",
            }}
          >
            {text}
          </span>
          <div style={{ padding: "20px", textAlign: align, fontSize: "30px" }}>
            {date}
          </div>
        </div>
      </Section>
    );
  },
};
