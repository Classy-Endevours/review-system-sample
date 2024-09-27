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
  fontSize?: string;
  subHeadingFontSize?: number;
  color?: string;
  contentOptions: string;
  justify?: string;
  gapX?: string;
  gapY?: string;
  column1Text: any;
  column2Text: any;
};

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
      type: "text",
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
    fontSize: "10px",
    contentOptions: "text",
    column1Text: `NALS Apartment Homes is pleased to present our
third quarter 2023 financial report and distributions.
Operating distributions for the third quarter were
$26.4 million, or 4.1% of the limited investment, with
all 46 properties earning a distribution. This record level
of distributions comes as we are also reinvesting over
$9.0 million in capital improvements. Year-to-date, we
have distributed $75.5 million, or 11.6% of the limited
investment while reinvesting $24.6 million in capital
improvements.
Our same store collected rents for the third quarter
declined 0.2% from the second quarter of this year, but
remains 2.1% above the third quarter of 2022. While the
growth in our collected rents has noticeably slowed,
it remains 30.5% above the first quarter of 2020 (prepandemic). The multifamily industry is experiencing
significant challenges in the form of declining rents,
increasing operating expenses brought on by inflation,
significant escalations in insurance costs, and rapidly
rising interest rates. While we are not immune to the
effects of these economic headwinds, we are insulated
from the direct effects of rising interest rates affecting
our competitors thanks to our decision to finance our
relatively low-leverage portfolio using only long-term,
fixed-rate debt. In addition to this, we have a seasoned
management team of long-term employees, whose
experience managing through the 2009 recession
provides valuable skills in navigating deteriorating
operating conditions. Their careful attention to the
upkeep of our properties has also resulted in us having
a remarkably low-loss history, which has helped reduce
the impact of rapidly rising insurance premiums on our
operating income relative to our competitors Our same store collected rents for the third quarter
 `,
    column2Text: `months, total insurance expense only represented
about 2% of our total income. Despite our unusually
favorable 10-year loss history (7.3% of our premium
on our property insurance), the overall insurance
markets are experiencing massive dislocation, affecting
apartment owners nationwide (See: WSJ: Commercial
Real Estates Next Big Headache: Spiraling Insurance
Costs). While we are not alone in this rapidly rising
expense environment, we anticipate many operators
of apartments will be experiencing significantly heavier
operating challenges as they realize the effects of
recent interest rate increases. This is especially true
for owners who elected to use short-term, variable
interest rate debt the past couple of years, and will
need to refinance in the coming months. During the
past two years, the underlying short-term government
interest rates (which are the benchmark rates used for
variable-rate loans), have increased from 0.5% to 5.5%
while long-term interest rates increased from 1.5% to
4.7% as of the writing of this letter. After incorporating
lender spreads to these increases in benchmark rates,
short-term apartment borrowing costs have tripled
for variable-rate borrowers and are up 2.5x for longterm borrowers. Federal Reserve sentiments expressed
during the last quarter meeting suggests interest rates
are likely to stay higher for longer which was reflected
in the most recent 100 basis point move in the ten-year
treasury rate. As one could imagine, this is devastating
news to the buyers responsible for the large number
of transactions that occurred during 2021 and 2022 at
historically h`,
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
  fontSize,
}: {
  fontSize: string;
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
      <div
        dangerouslySetInnerHTML={{ __html: column1Text }}
        style={{ fontSize }}
        className="w-1/2"
      ></div>

      <div
        style={{ fontSize }}
        className="w-1/2"
        dangerouslySetInnerHTML={{ __html: column2Text }}
      ></div>
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
  fontSize,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text: string;
  column2Text: string;
  justify: string;
  fontSize: string;
}) => {
  return (
    <div
      style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
      className={`flex justify-between gap-x-4 text-${justify}`}
    >
      <div
        style={{ fontSize }}
        dangerouslySetInnerHTML={{ __html: column1Text }}
        className="w-1/2"
      ></div>
      <div className="w-1/2">
        <div>
          <img src="/nals/nals-2-image.jpg" />
        </div>
        <div>
          <img src="/nals/nals-1-image.jpg" />
        </div>
        <div
          style={{ fontSize }}
          dangerouslySetInnerHTML={{ __html: column2Text }}
        ></div>
      </div>
    </div>
  );
};

const Image = ({
  gapX,
  gapY,
  color,
  justify,
}: {
  gapX: string;
  gapY: string;
  color: string;
  column1Text?: string;
  column2Text?: string;
  justify: string;
}) => {
  return (
    <div>
      <div
        style={{ color, gap: `${gapY || "10"}px ${gapX || "10 "}px` }}
        className={`flex justify-between gap-x-4  text-${justify}`}
      >
        <div className="py-4">
          {[1, 2, 3].map((_, idx) => (
            <div className="my-4" key={idx}>
              <img src="/nals/nals-1-image.jpg" />
            </div>
          ))}
        </div>
        <div className="py-4">
          {[1, 2, 3].map((_, idx) => (
            <div className="my-4" key={idx}>
              <img src="/nals/nals-2-image.jpg" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
