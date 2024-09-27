/* eslint-disable @typescript-eslint/no-explicit-any */

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

export const HeadingWithSubtitle: ComponentConfig<HeadingProps> = {
  fields: {
    text: {
      type: "textarea",
    },
    color: {
      type: "custom",
      render: ColorPicker as any,
    },
    date: {
      type: "textarea",
    },

    padding: { type: "text" },
  },
  defaultProps: {
    align: "center",
    text: "Third quarter update",
    subtitle: "Glen Park, Smyrna, GA (415 units)",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: ({ align, text, padding, subtitle, color, puck }) => {
    return (
      <Section padding={padding}>
        <div style={{ textTransform: "uppercase", textAlign: "center", color }}>
          <span
            style={{
              display: "block",
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
          <div
            style={{ padding: "20px", textAlign: "right", fontSize: "30px" }}
          >
            {subtitle}
          </div>
        </div>
      </Section>
    );
  },
};
