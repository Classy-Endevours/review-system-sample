/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";

export type NalsLogosProps = {
  imageSrc: string;
  align?: "left" | "center" | "right";
};

export const NalsLogo: ComponentConfig<NalsLogosProps> = {
  fields: {
    imageSrc: {
      type: "text",
    },
    align: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
      ],
    },
  },
  defaultProps: {
    align: "center",
    imageSrc: "/nals-logo.png",
  },
  render: ({ align, imageSrc }) => {
    return (
      <Section>
        <div style={{ display: "flex", justifyContent: align }}>
          <img
            src={imageSrc || "/nals-logo.png"}
            style={{ display: "block", margin: "0" }}
            alt="nals-logo"
          />
        </div>
      </Section>
    );
  },
};
