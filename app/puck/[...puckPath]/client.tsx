"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../config";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  console.log(path)
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data) => {
        localStorage.setItem('something', JSON.stringify(data));
      }}
    />
  );
}
