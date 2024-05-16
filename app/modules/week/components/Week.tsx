'use client'
import React, { useState, useEffect } from "react"
import Image from "next/image"
import DayProgress from "./DayProgress"
import Quiz from "./Quiz"

export default function Week({ props }: any){
    const [day1, setDay1] = useState(true)
    const [day2, setDay2] = useState(true)
    const [day3, setDay3] = useState(true)
    const [day4, setDay4] = useState(true)
    const [day5, setDay5] = useState(true) 
    const [reload, setReload] = useState(false)
    const [selected, setSelected] = useState(false)
    const [radialProgress, setRadialProgress] = useState(0)
    
    useEffect(()=>{
        setRadialProgress(0)
    },[selected])

    props.setRadialProgress = setRadialProgress
    props.radialProgress = radialProgress
    props.setSelected = setSelected
    props.selected = selected
    props.reload = reload
    props.setreload = setReload
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
        <h1 className="text-black font-semibold text-4xl m-5 animate-fade">
            {props.data[0].title}
        </h1>
        <div className="flex items-center w-full justify-evenly animate-fade">
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
            {!selected ? ( 
                <div className="w-64"/>
            ) : ( 
                <div className="w-64 flex flex-col items-center">
                    <div className="radial-progress text-loginblue bg-socskyblue" 
                        style={{ 
                            "--value": radialProgress,
                            "--size": "10rem",
                            "--thickness": "15px" 
                        } as React.CSSProperties} // Explicitly type as React.CSSProperties
                        role="progressbar">
                        {radialProgress}%
                    </div>
                </div>
            )}
        </div>
      </>
    )
}