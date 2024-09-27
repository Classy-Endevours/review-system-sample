/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @next/next/no-img-element */
import React from "react";
import { ComponentConfig } from "@measured/puck";
import { Section } from "@/config/components/Section";
import ColorPicker from "@/config/components/ColorPicker";
import RTE from "@/app/components/Editor/RTE";

export type LogosProps = {
  logos: {
    alt: string;
    imageUrl: string;
  }[];
};

export type HeadingProps = {
  align?: "left" | "center" | "right";
  text?: string;
  sub_text?: string;
  padding?: string;
  borderBottom?: string;
  date?: string;
  subtitle?: string;
  fontSize?: number;
  subHeadingFontSize?: number;
  color?: string;
  contentOptions: string;
  justify?: string;
  gapX?: string;
  gapY?: string;
  column1Text: any;
  column2Text: any;
};

const fontOptions = [
  { label: "10", value: 10 },
  { label: "20", value: 20 },
  { label: "30", value: 30 },
  { label: "40", value: 40 },
  { label: "50", value: 50 },
];

export const ContentWindow: ComponentConfig<HeadingProps> = {
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

    column1Text: {
      type: "custom",
      render: RTE,
      //   render: RTE,
    },
    column2Text: {
      type: "custom",
      render: RTE,
    },
    contentOptions: {
      type: "radio",
      options: [
        { label: "Text", value: "text" },
        { label: "Text with Image", value: "textWithImage" },
        { label: "Image", value: "image" },
      ],
    },

    justify: {
      type: "radio",
      options: [
        { label: "Left", value: "left" },
        { label: "Center", value: "center" },
        { label: "Right", value: "right" },
        { label: "Justify", value: "justify" },
      ],
    },
    padding: { type: "text" },
    gapX: {
      type: "text",
    },
    gapY: {
      type: "text",
    },
  },
  defaultProps: {
    contentOptions: "text",
    column1Text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat mollis justo, eu dignissim odio rhoncus non. Aenean tempus ligula ut eleifend elementum. Maecenas tempus bibendum mi, ut cursus sapien posuere vel. Sed id volutpat metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris et sapien quis ligula malesuada fringilla vel pulvinar neque. Phasellus quis neque ut arcu luctus congue. Morbi dapibus, diam ut viverra pharetra, ante tortor gravida nibh, quis tincidunt nisl libero eget purus. Curabitur libero eros, mattis in enim ac, molestie gravida leo. Phasellus eget sodales nisi. Suspendisse ullamcorper ultrices imperdiet. Nunc hendrerit gravida lacinia. Aliquam aliquet elementum condimentum. Nam a consequat magna. Ut vel dictum dolor.Fusce non rhoncus sapien, ac imperdiet massa. Aenean id sem quis orci posuere placerat id in magna. Sed non nisi et risus vestibulum fringilla. Sed at tortor risus. Nam scelerisque, risus in finibus mollis, orci dui facilisis risus, id egestas risus velit sed purus. Curabitur rhoncus varius odio in semper. Nulla accumsan risus ultricies dictum euismod. Ut vel lacinia risus, quis convallis mauris. Sed gravida dapibus tortor, quis scelerisque ligula posuere at. Aliquam nec metus vulputate, feugiat orci dignissim, rhoncus nisi. Curabitur pharetra sit amet lectus eget finibus. Cras cursus leo euismod velit auctor elementum.`,
    column2Text: `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi volutpat mollis justo, eu dignissim odio rhoncus non. Aenean tempus ligula ut eleifend elementum. Maecenas tempus bibendum mi, ut cursus sapien posuere vel. Sed id volutpat metus. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Mauris et sapien quis ligula malesuada fringilla vel pulvinar neque. Phasellus quis neque ut arcu luctus congue. Morbi dapibus, diam ut viverra pharetra, ante tortor gravida nibh, quis tincidunt nisl libero eget purus. Curabitur libero eros, mattis in enim ac, molestie gravida leo. Phasellus eget sodales nisi. Suspendisse ullamcorper ultrices imperdiet. Nunc hendrerit gravida lacinia. Aliquam aliquet elementum condimentum. Nam a consequat magna. Ut vel dictum dolor.Fusce non rhoncus sapien, ac imperdiet massa. Aenean id sem quis orci posuere placerat id in magna. Sed non nisi et risus vestibulum fringilla. Sed at tortor risus. Nam scelerisque, risus in finibus mollis, orci dui facilisis risus, id egestas risus velit sed purus. Curabitur rhoncus varius odio in semper. Nulla accumsan risus ultricies dictum euismod. Ut vel lacinia risus, quis convallis mauris. Sed gravida dapibus tortor, quis scelerisque ligula posuere at. Aliquam nec metus vulputate, feugiat orci dignissim, rhoncus nisi. Curabitur pharetra sit amet lectus eget finibus. Cras cursus leo euismod velit auctor elementum.`,
    justify: "left",
    text: "Sold property distributions",
    padding: "24px",
    borderBottom: "2px solid green",
    gapX: "1px",
    gapY: "1px",
  },
  render: ({
    padding,
    color,
    justify,
    contentOptions,
    gapX,
    gapY,
    column1Text,
    column2Text,
  }) => {
    const RenderContent = {
      text: Text,
      textWithImage: TextWithImage,
      image: Image,
    };
    const Component =
      RenderContent[contentOptions as keyof typeof RenderContent];
    console.log({ Component });
    return (
      <Section padding={padding}>
        <Component
          gapX={gapX!}
          gapY={gapY!}
          color={color!}
          justify={justify!}
          column1Text={column1Text!}
          column2Text={column2Text!}
        />
      </Section>
    );
  },
};

const Text = ({
  gapX,
  gapY,
  color,
  justify,
  column1Text,
  column2Text,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text: string;
  column2Text: string;
  justify: string;
}) => {
  return (
    <div
      style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
      // style={{ color }}
      className={`flex justify-between text-${justify}`}
    >
      <div dangerouslySetInnerHTML={{ __html: column1Text }}></div>
      <div dangerouslySetInnerHTML={{ __html: column2Text }}></div>
    </div>
  );
};

const TextWithImage = ({
  gapX,
  gapY,
  color,
  justify,
  column1Text,
  column2Text,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text: string;
  column2Text: string;
  justify: string;
}) => {
  return (
    <div
      style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
      className={`flex justify-between gap-x-4 text-${justify}`}
    >
      <div>
        {column1Text}
        <img src="https://images.unsplash.com/photo-1727324735318-c25d437052f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
      <div>
        {column2Text}
        <img src="https://images.unsplash.com/photo-1727324735318-c25d437052f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
      </div>
    </div>
  );
};

const Image = ({
  color,
  justify,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text: string;
  column2Text: string;
  justify: string;
}) => {
  return (
    <div>
      <div
        style={{ color }}
        className={`flex justify-between gap-x-4  text-${justify}`}
      >
        <div className="py-4">
          {[1, 2, 3].map((_, idx) => (
            <div className="my-4" key={idx}>
              <img src="https://images.unsplash.com/photo-1727324735318-c25d437052f7?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
            </div>
          ))}
        </div>
        <div className="py-4">
          {[1, 2, 3].map((_, idx) => (
            <div className="my-4" key={idx}>
              <img src="https://plus.unsplash.com/premium_photo-1719611418530-353ffc0e92ff?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwzfHx8ZW58MHx8fHx8" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
