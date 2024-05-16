import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SoCBot() {
  return (
    <div className="flex flex-col items-center">
      <Link
        href="https://soc-llm.vercel.app"
        className="flex flex-col items-center"
      >
        <div className="flex items-center mb-8 mt-8">
          <Image
            src="/botplaceholder.png"
            alt="SoCBot"
            width={200}
            height={200}
            className="mx-auto"
          />
        </div>
        <h1 className="text-center mb-4 text-4xl">
          The SoC Chat Bot brought to you by Team LLM (Large Language Mavericks)
        </h1>
        <h1 className="text-center mb-4 text-2xl">
          Click for more information
        </h1>
      </Link>
      <div className="overflow-hidden rounded-3xl m-4 shadow-md">
        <iframe
          src="https://soc-llm.vercel.app"
          width="1440"
          height="1024"
          allowFullScreen
          className="-mt-24 -mb-12"
        />
      </div>
    </div>
  );
}
