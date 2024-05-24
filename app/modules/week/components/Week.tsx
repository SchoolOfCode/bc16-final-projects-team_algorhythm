'use client'
import React, { useState, useEffect } from "react"
import Image from "next/image"
import DayProgress from "./DayProgress"
import Quiz from "./Quiz"
import Link from "next/link"

export default function Week({ props }: any){
    const [day1, setDay1] = useState(true)
    const [day2, setDay2] = useState(true)
    const [day3, setDay3] = useState(true)
    const [day4, setDay4] = useState(true)
    const [day5, setDay5] = useState(true) 
    const [refresh, setRefresh] = useState(false)
    const [selected, setSelected] = useState(false)
    const [radialProgress, setRadialProgress] = useState(0)
    props.setRadialProgress = setRadialProgress
    props.radialProgress = radialProgress
    props.setSelected = setSelected
    props.selected = selected
    props.setRefresh = setRefresh
    props.refresh = refresh
    props.day1 = day1
    props.setDay1 = setDay1
    props.day2 = day2
    props.setDay2 = setDay2
    props.day3 = day3
    props.setDay3 = setDay3
    props.day4 = day4
    props.setDay4 = setDay4
    props.day5 = day5
    props.setDay5 = setDay5

    return (
        <>
        <h1 className="text-black font-semibold text-4xl m-5 animate-fade dark:text-white">
            <Link href={'/modules'} className=" absolute left-40 btn bg-loginblue text-white hover:text-black hover:bg-socskyblue border-0">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
                Return
            </Link>
            {props.data[0].title}
        </h1>
        <div className="w-64"/>
        <div className="flex items-start w-full justify-evenly animate-fade">
            <DayProgress props={props}/>
            {!selected ? (
                <div className="flex flex-col w-[30%] items-center">
                  <h1 className="text-black font-semibold text-2xl m-5 dark:text-white">
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
            {selected && radialProgress ? ( 
                <div className="w-64 flex flex-col items-center justify-between">
                    <div className="h-28"/>
                        <p className="pb-3">Quiz Progress   </p>
                        <div className="radial-progress text-gray-300 bg-transparent shadow-lg" 
                            style={{ 
                                "--value": 100,
                                "--size": "10rem",
                                "--thickness": "15px" 
                            } as React.CSSProperties} // Explicitly type as React.CSSProperties
                            role="progressbar">
                            <div className="radial-progress text-loginblue  z-50" 
                            style={{ 
                                "--value": radialProgress,
                                "--size": "10rem",
                                "--thickness": "15px" 
                            } as React.CSSProperties} // Explicitly type as React.CSSProperties
                            role="progressbar">
                            {radialProgress}%
                        </div>
                        </div>
                    <div className="h-28"/>
                </div>
            ) : ( 
                <div className="w-64"/>
                
            )}
        </div>
      </>
    )
}