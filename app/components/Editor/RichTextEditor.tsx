"use client";
import { Button } from "@chakra-ui/react";
import React, { useState, useEffect } from "react";
import Editor from "react-simple-wysiwyg";

type RichTextEditorProps = {
  goToNext: () => void;
  customNextButton?: string;
  value?: string;
};

const RichTextEditor = ({ goToNext, customNextButton, value: initialValue }: RichTextEditorProps) => {
  function generateRandomParagraph(numSentences: number) {
    const sentences = [
      `NALS Apartment Homes is pleased to present our
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
experience managing through the 2009 recessi `,
    ];

    let paragraph = "";
    for (let i = 0; i < numSentences; i++) {
      const randomIndex = Math.floor(Math.random() * sentences.length);
      paragraph += sentences[randomIndex] + " ";
    }

    return paragraph.trim();
  }

  const [value, setValue] = useState(initialValue || generateRandomParagraph(5));

  // Update the state if the initialValue changes
  useEffect(() => {
    if (initialValue) {
      setValue(initialValue);
    }
  }, [initialValue]);

  return (
    <div className="h-[12vh]">
      <div className="flex justify-end mt-2">
        <Button onClick={goToNext} colorScheme="green">
          {customNextButton ? customNextButton : "Next"}
        </Button>
      </div>
      <div className="p-2 h-[10vh]">
        <Editor
          value={value}
          containerProps={{ style: { height: "50vh", overflow: "scroll" } }}
          onChange={(e) => setValue(e.target.value)}
        />
      </div>
    </div>
  );
};

export default RichTextEditor;
