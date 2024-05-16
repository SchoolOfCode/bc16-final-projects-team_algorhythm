import React from "react";

export default function SoCBot() {
  return (
    <div>
      <h1>SoCBot</h1>
      <div className="overflow-hidden rounded-3xl">
        <iframe
          src="https://soc-llm.vercel.app"
          width="720"
          height="1080"
          allowFullScreen
          className="-mt-24 -mb-12" // Add this line to apply negative top margin
        />
      </div>
    </div>
  );
}