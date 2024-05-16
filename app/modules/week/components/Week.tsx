'use client'
import React, { useState, useEffect } from "react"
import Image from "next/image"
import DayProgress from "./DayProgress"
import Quiz from "./Quiz"

export default function Week({ props }: any){
    const [selected, setSelected] = useState(false)
    props.setSelected = setSelected
    props.selected = selected

    useEffect(()=>{
        console.log(selected)
    },[selected])

    return (
        <>
        <h1 className="text-black font-semibold text-4xl m-5 animate-fade">
            {props.data[0].title}
        </h1>
        <div className="flex items-start w-full justify-evenly animate-fade">
            <DayProgress props={props}/>
            {!selected ? (
                <div className="flex flex-col w-[30%] items-center">
                  <h1 className="text-black font-semibold text-2xl m-5">
                    Time to test your knowledge
                  </h1>
                  <Image
                    src={`/quizicons/${props.data[0].img}.png`}
                    alt="Content"
                    width={400}
                    height={400}
                    className="w-full max-w-[400px] m-2"
                   />
                </div>
                ) : ( 
                <form className="flex flex-col w-[30%] items-center">
                    <Quiz props={props}/>
                </form>
                )
            }
            <div className="w-64"/>
        </div>
      </>
    )
}