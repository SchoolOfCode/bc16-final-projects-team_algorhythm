"use client";
import Link from "next/link";
import { useState } from "react";

export default function DayProgress({ props }: any) {

  return (
    <ul className="steps steps-vertical w-64 pt-2 animate-fade-right">
      <li className="step h-24">
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(1)}
        >Day 1
        </p>
      </li>
      <li className="step h-24">
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(2)}
        >Day 2
        </p>
      </li>
      <li className="step h-24">
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(3)}
        >Day 3
        </p>
      </li>
      <li className="step h-24">
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(4)}
        >Day 4
        </p>
      </li>
      <li className="step h-24">
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(5)}
        >Day 5
        </p>
      </li>
    </ul>
  );
}