"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  console.log(path)
  const stringifiedResponse = typeof window !== "undefined" && localStorage.getItem('puck');
  let output: Partial<Data> = data;
  if (stringifiedResponse) {
    output = JSON.parse(stringifiedResponse);
  }

  return (
    <Puck
      config={config}
      data={output}
      onPublish={async (data) => {
        localStorage.setItem('puck', JSON.stringify(data));
        window.open('/preview', '_blank');
      }}
    />
  );
}
