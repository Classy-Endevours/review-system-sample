/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";
import { ComponentConfig } from "@measured/puck";
import getClassNameFactory from "../../../lib/get-class-name-factory";
import imagePicker from "@/config/components/ImagePicker";

const getClassName = getClassNameFactory("Logos", styles);

export type ImageProps = {
  alt: string;
  src: string;
  pick: string;
  margin: string;
  height?: string;
  width?: string;
};

export const Image: ComponentConfig<ImageProps> = {
  fields: {
    src: { type: "text" },
    alt: { type: "text" },
    margin: { type: "text" },
    height: { type: "text" },
    width: { type: "text" },
    pick: {
      type: 'custom',
      render: imagePicker as any
    }
  },
  defaultProps: {
    alt: "google",
    src: "",
    pick: "",
    margin: "auto",
    width: "100%",
    height: "64px"
  },
  render: ({ alt, src, pick, height, width, margin }) => {
    return (
      <img
        className={getClassName("image")}
        alt={alt}
        src={src || pick}
        height={height}
        width={width}
        style={{
          margin
        }}
      ></img>
    );
  },
};
