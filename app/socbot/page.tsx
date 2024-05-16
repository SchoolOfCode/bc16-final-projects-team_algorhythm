import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function SoCBot() {
  return (
    <div className="flex flex-col items-center">
      <Link href="https://soc-llm.vercel.app">
        <Image
          src="/botplaceholder.png"
          alt="SoCBot"
          width={200}
          height={200}
          className="align-middle justify-center flex flex-auto mb-4 mt-4"
        />
      </Link>
      <div className="overflow-hidden rounded-3xl m-4">
        <iframe
          src="https://soc-llm.vercel.app"
          width="1440"
          height="1024"
          allowFullScreen
          className="-mt-24 -mb-12" // Add this line to apply negative top margin
        />
      </div>
    </div>
  );
}
