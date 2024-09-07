"use client";
import { TypewriterEffectSmooth } from "../Containers/TextWrite";
export function TextWrite() {
  const words = [
    {
      text: "Enter",
    },
    {
      text: "your ",
    },

    {
      text: " Opponent Name.",
      className: "text-red-700 dark:text-blue-500",
    },
  ];
  return (
    (<div className="flex flex-col items-center justify-center h-[40rem]  ">

      <TypewriterEffectSmooth words={words} />
      <div
        className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <button
          className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
          Join now
        </button>
        <button
          className="w-40 h-10 rounded-xl bg-white text-black border border-black  text-sm">
          Signup
        </button>
      </div>
    </div>)
  );
}
