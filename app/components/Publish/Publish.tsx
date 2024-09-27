"use client";
import React from "react";
import Confetti from "react-confetti";

import { useWindowSize } from "@react-hook/window-size";

const Publish = () => {
  const [width, height] = useWindowSize();

  return (
    <div className="flex items-center justify-center">
      <Confetti width={width} height={height} />
      <div className="h-[50vh] flex justify-center items-center">
        <h1 className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text text-4xl font-bold">
          Thank You for publishing!
        </h1>
      </div>
    </div>
  );
};

export default Publish;
