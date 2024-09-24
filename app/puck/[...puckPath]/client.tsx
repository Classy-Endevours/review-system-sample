"use client";

import type { Data } from "@measured/puck";
import { Puck } from "@measured/puck";
import config from "../../../config";
import { useRouter } from "next/navigation";

export function Client({ path, data }: { path: string; data: Partial<Data> }) {
  console.log(path)
  const router = useRouter();
  return (
    <Puck
      config={config}
      data={data}
      onPublish={async (data) => {
        localStorage.setItem('puck', JSON.stringify(data));
        router.push('/preview')
      }}
    />
  );
}
