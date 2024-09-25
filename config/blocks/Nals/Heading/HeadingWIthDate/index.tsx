/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";
import { HeadingProps } from "@/config/blocks/Heading";

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

const levelOptions = [
  { label: "", value: "" },
  { label: "1", value: "1" },
  { label: "2", value: "2" },
  { label: "3", value: "3" },
  { label: "4", value: "4" },
  { label: "5", value: "5" },
  { label: "6", value: "6" },
];

export const HeadingWithDate: ComponentConfig<HeadingProps> = {
  fields: {
    text: {
      type: "textarea",
    },
    date:{
      type:'textarea'
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
    date: "october 15, 2023",
    padding: "24px",
    borderBottom: "2px solid green",
    size: "m",
  },
  render: ({ align, text,  padding, date }) => {
    return (
      <Section padding={padding}>
        <div style={{ textTransform: "uppercase",textAlign: "center" }}>
          <span
            style={{
              display: "inline",
              textAlign: align,
              width: "100%",
              letterSpacing: "7px",
              fontSize: "55px",
              borderBottom: "2px solid #7dba5c", 
              paddingBottom: "10px"
            }}
            
          >
            {text}
          </span>
          <div style={{ padding: "20px", textAlign: align,fontSize: "30px", }}>{date}</div>
        </div>
      </Section>
    );
  },
};
