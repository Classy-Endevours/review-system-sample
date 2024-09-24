"use client";

import ReviewSystem from "../components/Review/ReviewPage";

export default function Home() {
  return <ReviewSystem textUrl={"/data.txt"} />;
}
