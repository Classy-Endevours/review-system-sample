/* eslint-disable @next/next/no-img-element */
import React from "react";
import styles from "./styles.module.css";
import { ComponentConfig } from "@measured/puck";
import getClassNameFactory from "../../../lib/get-class-name-factory";

const getClassName = getClassNameFactory("Logos", styles);

export type ImageProps = {
  alt: string;
  src: string;
};

export const Image: ComponentConfig<ImageProps> = {
  fields: {
    src: { type: "text" },
    alt: { type: "text" },
  },
  defaultProps: {
    alt: "google",
    src:
      "https://logolook.net/wp-content/uploads/2021/06/Google-Logo.png",
  },
  render: ({ alt, src }) => {
    return (
      <img
        className={getClassName("image")}
        alt={alt}
        src={src}
        height={64}
      ></img>
    );
  },
};
