/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";
import { HeadingProps } from "@/config/blocks/Heading";
import ColorPicker from "@/config/components/ColorPicker";
import { fontOptions } from "../HeadingLeftAlign";

export type LogosProps = {
  logos: {
    alt: string;
    imageUrl: string;
  }[];
};

export const HeadingRightAlign: ComponentConfig<HeadingProps> = {
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

    padding: { type: "text" },
  },
  defaultProps: {
    align: "center",
    text: "Current property distributions",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: ({ text, padding, color, fontSize }) => {
    return (
      <Section padding={padding}>
        <div style={{ textTransform: "uppercase", textAlign: "left", color }}>
          <span
            style={{
              display: "block",
              textAlign: "right",
              width: "100%",
              letterSpacing: "7px",
              fontSize: fontSize ? fontSize + "px" : "40px",
              borderBottom: "2px solid #7dba5c",
              paddingBottom: "10px",
            }}
          >
            {text}
          </span>
        </div>
      </Section>
    );
  },
};
