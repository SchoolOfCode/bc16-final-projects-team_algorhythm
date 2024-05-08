import React from "react";

export default function DashBoard() {
  return (
    <>
      <h1 className="inline-flex *:mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        Your Dashboard
      </h1>
      <div
        className="radial-progress text-primary"
        style={{ "--value": 70 }}
        role="progressbar"
      >
        70%
      </div>
      <button className="btn btn-primary">Your Quizzes</button>
    </>
  );
}
