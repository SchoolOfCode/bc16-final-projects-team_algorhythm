'use client'

import { useEffect, useState } from "react"
import StudentOverview from "./StudentOverview"
import Image from "next/image"
import Link from "next/link"

export default function StudentDashBoard({ data, userData }: any){
    const [overView, setOverView] = useState(false)
    const [todo, setTodo] = useState(false)
    const [backBtn, setBackBtn] = useState(false)
    const [recommended, setRecommended] = useState(false)

    useEffect(()=>{
        setBackBtn(todo || overView)
        setRecommended(false)
    },[todo,overView])

    return(
        <div className="flex-1 flex flex-col pt-10 px-10 w-full">
            <div className=" flex flex-row justify-between mb-5 ">
                <h1 className="font-black text-4xl pb-3 text-left ">
                    {userData.data![0].first_name}&apos;s Dashboard
                </h1>
                <div className="flex gap-5">
                    {backBtn ? 
                    <p 
                    className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
                    onClick={()=>{setBackBtn(false); setOverView(false); setTodo(false)}}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
                        </svg>
                    </p> : null }
                    <p 
                    className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
                    onClick={()=>{setTodo(!todo); setOverView(false)}}>
                        To-do
                    </p>
                    <p 
                    className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
                    onClick={()=>{setOverView(!overView); setTodo(false)}}>
                        Progress overview
                    </p>
                </div>
            </div>
            {!overView ? (
                <div className="card w-full bg-base-100 shadow-xl">
                    <div className="bg-gradient-to-t from-transparent to-socskyblue w-full h-fit rounded-t-xl flex items-center p-4">
                        <Image
                            className="bg-white rounded-full w-fit h-fit m-5 shadow-xl"
                            src="/usericon.png"
                            alt="User image"
                            width={100}
                            height={100}
                        />
                        <table className="text-center w-full table-auto text-lg">
                            <thead>
                            <tr className="flex w-full justify-between rounded-t-xl ">
                                <th className="flex-1">Rank</th>
                                <th className="flex-1">Leaderboard</th>
                                <th className="flex-1">Hours</th>
                                <th className="flex-1">Modules</th>
                                <th className="flex-1">Correct answers</th>
                                <th className="flex-1">Achievements</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="flex w-full justify-between rounded-b-xl ">
                                <td className="flex-1">Noob</td>
                                <td className="flex-1">4</td>
                                <td className="flex-1">30</td>
                                <td className="flex-1">1</td>
                                <td className="flex-1">10</td>
                                <td className="flex-1">3</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className="bg-white rounded-b-xl p-5">
                        <div className="flex items-center mb-3">
                            <h2 className="card-title px-2">
                                Achievements : 
                                {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                            </h2>
                            <p>
                                item1
                            </p>
                            <p>
                                item2
                            </p>
                        </div>
                        <div className="flex items-center mb-3">
                            <h2 className="card-title px-2">
                                Modules completed : 
                                {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                            </h2>
                            <p>
                                item1
                            </p>
                            <p>
                                item2
                            </p>
                        </div>
                        <div className="flex items-center mb-3">
                            <h2 className="card-title px-2">
                                Your leading module : 
                                {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                            </h2>
                            <p>
                                item1
                            </p>
                        </div>
                        <div className="flex items-center mb-3">
                            <h2 className="card-title px-2">
                                Your weakest module : 
                                {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                            </h2>
                            <p>
                                item1
                            </p>
                        </div>
                        <div className="flex justify-around mt-10 text-center">
                            <details className="collapse">
                                <summary className="flex items-center justify-center hover:cursor-pointer" onClick={()=>setRecommended(!recommended)}>
                                    <p className="font-bold">
                                        Recommended content
                                    </p>
                                    {!recommended ? <svg className="animate-bounce w-6 h-6 inline-block " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 470.6c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 402.7 361.4 265.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3l-160 160zm160-352l-160 160c-12.5 12.5-32.8 12.5-45.3 0l-160-160c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0L224 210.7 361.4 73.4c12.5-12.5 32.8-12.5 45.3 0s12.5 32.8 0 45.3z"/></svg>
                                    : <svg className="animate-bounce w-6 h-6 inline-block " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512"><path d="M246.6 41.4c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 109.3 361.4 246.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3l-160-160zm160 352l-160-160c-12.5-12.5-32.8-12.5-45.3 0l-160 160c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L224 301.3 361.4 438.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3z"/></svg>
                                    }
                                </summary>
                                <div className="collapse-content"> 
                                    <div className="flex justify-around">
                                        <div className="flex flex-col">
                                            <h2 className="card-title">To elevate your skills</h2>
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="card-title">To strengthen your weakest area</h2>
                                        </div>

                                    </div>
                                </div>
                            </details>
                        </div>
                        <div className="card-actions justify-end absolute right-3 bottom-3">
                            <div className="badge bg-loginblue text-white p-3 cursor-pointer hover:bg-socskyblue hover:text-black">Share progress</div>
                        </div>
                    </div>
                </div>
            ) : ( 
                <StudentOverview data={data} userData={userData}/>
            )}
        </div>
    )
}