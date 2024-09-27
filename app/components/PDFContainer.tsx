import { Button } from "@chakra-ui/react";
import { FolderDown } from "lucide-react";
import React, { ReactNode } from "react";
import generatePDF, { Options } from "react-to-pdf";

const options: Options = {
  filename: "generated-multi-modal-pdf.pdf",
  page: {
    margin: 20,
  },
};

const getTargetElement = () => document.getElementById("container");

const downloadPdf = () => generatePDF(getTargetElement, options);

export const PDFContainer = ({ children }: { children: ReactNode }) => {
  return (
    <div className="mt-8 flex flex-col xs:flex-col-reverse text-black">
      <div className="fixed top-0 right-4 flex justify-end xs:py-4 cursor-pointer">
        <Button
          onClick={() => downloadPdf()}
          className="gap-x-4 mr-2"
          colorScheme="whatsapp"
        >
          Download <FolderDown />
        </Button>
      </div>
      <div className="fixed bottom-4 right-4">
        <button
          onClick={() => downloadPdf()}
          type="button"
          className="hover:scale-105 duration-100 ease-linear text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center me-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          <span className="sr-only">Icon description</span>
        </button>
      </div>
      <div id="container">{children}</div>
    </div>
  );
};
