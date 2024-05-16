"use client";
import Link from "next/link";
import { useState } from "react";

export default function DayProgress({ props }: any) {
  const selected = props.selected

  return (
    <ul className="steps steps-vertical w-64 pt-2 animate-fade-right">
      <li className="step h-24">
        {selected ? (<p className={selected === 1 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300"}
        onClick={()=>props.setSelected(1)}
        >Day 1
        </p>
        ) : (
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(1)}
        >Day 1
        </p>
        )}
      </li>
      <li className="step h-24">
        {selected ? (<p className={selected === 2 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300"}
        onClick={()=>props.setSelected(2)}
        >Day 2
        </p>
        ) : (
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(2)}
        >Day 2
        </p>
        )}
      </li>
      <li className="step h-24">
        {selected ? (<p className={selected === 3 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300"}
        onClick={()=>props.setSelected(3)}
        >Day 3
        </p>
        ) : (
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(3)}
        >Day 3
        </p>
        )}
      </li>
      <li className="step h-24">
        {selected ? (<p className={selected === 4 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300"}
        onClick={()=>props.setSelected(4)}
        >Day 4
        </p>
        ) : (
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(4)}
        >Day 4
        </p>
        )}
      </li>
      <li className="step h-24">
        {selected ? (<p className={selected === 5 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300"}
        onClick={()=>props.setSelected(5)}
        >Day 5
        </p>
        ) : (
        <p className="btn btn-ghost bg-socskyblue hover:bg-loginblue"
        onClick={()=>props.setSelected(5)}
        >Day 5
        </p>
        )}
      </li>
    </ul>
  );
}