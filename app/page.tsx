"use client"
import ReviewSystem from "./components/ReviewPage";
export default function Home() {
  return (
    <ReviewSystem textUrl={'/data.txt'} />
  );
}
