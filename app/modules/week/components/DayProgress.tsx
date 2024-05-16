"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DayProgress({ props }: any) {

  const selected = props.selected

  const completed = (props.results.data).length !== 0 ? props.results.data : false

  useEffect(()=>{
    if(completed){
      props.setDay1(completed.some((item: any) => item.day_number === 1 && item.success === true) ? true : false)
      props.setDay2(completed.some((item: any) => item.day_number === 2 && item.success === true) ? true : false)
      props.setDay3(completed.some((item: any) => item.day_number === 3 && item.success === true) ? true : false)
      props.setDay4(completed.some((item: any) => item.day_number === 4 && item.success === true) ? true : false)
      props.setDay5(completed.some((item: any) => item.day_number === 5 && item.success === true) ? true : false)
    } else{
      props.setDay1(false)
      props.setDay2(false)
      props.setDay3(false)
      props.setDay4(false)
      props.setDay5(false)
    }

  }, [])

  //console.log(day1, day2, day3, day4, day5)

  return (
    <ul className="steps steps-vertical w-64 pt-2 animate-fade-right">
      <li className="step h-24">
        {selected || props.day1 ? (<p className={selected === 1 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300 pointer-events-none"}
        onClick={selected === 1 ? ()=>props.setSelected(false) : undefined}
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
        {selected || props.day2 ? (<p className={selected === 2 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300 pointer-events-none"}
        onClick={selected === 2 ? ()=>props.setSelected(false) : undefined}
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
        {selected || props.day3 ? (<p className={selected === 3 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300 pointer-events-none"}
        onClick={selected === 3 ? ()=>props.setSelected(false) : undefined}
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
        {selected || props.day4 ? (<p className={selected === 4 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300 pointer-events-none"}
        onClick={selected === 4 ? ()=>props.setSelected(false) : undefined}
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
        {selected || props.day5 ? (<p className={selected === 5 ? "btn btn-ghost bg-loginblue" : "btn btn-ghost bg-gray-300 pointer-events-none"}
        onClick={selected === 5 ? ()=>props.setSelected(false) : undefined}
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