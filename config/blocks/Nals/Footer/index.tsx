/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";
import { _HeadingProps } from "@/versionated/Heading";
import { fontOptions } from "../Heading/HeadingLeftAlign";
import ColorPicker from "@/config/components/ColorPicker";

export type LogosProps = {
  logos: {
    alt: string;
    imageUrl: string;
  }[];
};


export type FooterProps = {
  align: "left" | "center" | "right";
  text?: string;
  sub_text?: string;
  level?: _HeadingProps["rank"];
  size?: _HeadingProps["size"];
  padding?: string;
  borderBottom?: string;
  date?: string;
  subtitle?: string;
  fontSize?: {
    type: string;
    options: {
      value: number;
      label: string;
    }[];
  };
  subHeadingFontSize?: {
    type: string;
    options: {
      value: number;
      label: string;
    }[];
  };
  address: string;
  phone: string;
  fax: string;
  website: string;
  color?: string;
};

export const Footer: ComponentConfig<FooterProps> = {
  fields: {
    text: {
      type: "text",
    },
    address: {
      type: "text",
    },
    phone: {
      type: "text",
    },
    fax: {
      type: "text",
    },
    website: {
      type: "text",
    },
    color: {
      type: "custom",
      render: ColorPicker as any,
    },
    
    fontSize: {
      type: "select",
      options: fontOptions,
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
    address: "920 Garden Street,Santa Barbara, CA 93101",
    phone: "(805) 963-2884",
    fax: "(805) 963-2884",
    website: "www.nals.co,",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: ({
    align,
    address,
    phone,
    fax,
    website,
    padding,
    fontSize,
    color,
  }) => {
    return (
      <Section padding={padding}>
        <div style={{ textAlign: "center" }}>
          <div
            style={{
              paddingTop: "20px",
              textAlign: align,
              fontSize: fontSize + "px",
              borderTop: "2px solid #7dba5c",
              width: "full",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "5px",
              color,
            }}
          >
            <span>{address}</span>| Phone:<span>{phone}</span>| Fax:
            <span>{fax}</span>|<span className="underline text-blue-600">{website}</span>
          </div>
        </div>
      </Section>
    );
  },
};
