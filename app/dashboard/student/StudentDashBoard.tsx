'use client'

import { useEffect, useState } from "react"
import StudentOverview from "./StudentOverview"
import StudentScore from "./StudentScore"
import StudentTodo from "./StudentToDo"
import Image from "next/image"

export default function StudentDashBoard({ data, userData, img }: any){
    const modules = ['Onboarding', 'Front end engineer','Software engineer','Back end engineer','Database engineer','QA engineer','Web engineer','React','Product experience','DevOps engineer','Cybersecurity','AI and Data']
    const rank = ['Newbie','Novice','Starter','Apprentice','Journeyman','Adept','Expert','Master','Grand Master','Doyen','Guru','Yoda','Legend']
    const [overView, setOverView] = useState(false)
    const [todo, setTodo] = useState(false)
    const [backBtn, setBackBtn] = useState(false)
    const [recommended, setRecommended] = useState(false)
    const [userInfo, setUserInfo] = useState<any>({});
    const [achievements, setAchievements] = useState(1)
    const [achievementsImgs, setAchievementsImgs] = useState(['/soclogo.png'])

    useEffect(()=>{
        setBackBtn(todo || overView)
        setRecommended(false)

    },[todo,overView])

    useEffect(() => {
        const getScore = async () => {
          const result = await StudentScore(data,userData);
          setUserInfo(result);

          
        };
        getScore();
    }, [data]);

    useEffect(()=>{
        const modulesDone = userInfo.modules
        const total = userInfo.totalCorrect
        const leaderboard = userInfo.leaderboard
        // Adding Achievements over modules completed
        if(modulesDone){   
            switch(true){
                case modulesDone >= 12:
                    setAchievements((prev:number)=> prev + 3)
                    achievementsImgs.push('/achievements/module1.png','/achievements/module2.png','/achievements/module3.png')
                    break; 
                case modulesDone >= 6:
                    setAchievements((prev:number)=> prev + 2)
                    achievementsImgs.push('/achievements/module1.png','/achievements/module2.png')
                    break;
                case modulesDone >= 1:
                    setAchievements((prev:number)=> prev + 1)
                    achievementsImgs.push('/achievements/module1.png')
                    break;
                default:
                    break;
            }
        }
        // Adding Achivements over correct answers
        if(total){
            
            switch (true) {
                case total >= 600:
                    setAchievements((prev: number) => prev + 5);
                    achievementsImgs.push(
                        '/achievements/answers20.png',
                        '/achievements/answers150.png',
                        '/achievements/answers250.png',
                        '/achievements/answers350.png',
                        '/achievements/answers600.png'
                    );
                    break;
                case total >= 350:
                    setAchievements((prev: number) => prev + 4);
                    achievementsImgs.push(
                        '/achievements/answers20.png',
                        '/achievements/answers150.png',
                        '/achievements/answers250.png',
                        '/achievements/answers350.png'
                    );
                    break;
                case total >= 250:
                    setAchievements((prev: number) => prev + 3);
                    achievementsImgs.push(
                        '/achievements/answers20.png',
                        '/achievements/answers150.png',
                        '/achievements/answers250.png'
                    );
                    break;
                case total >= 150:
                    setAchievements((prev: number) => prev + 2);
                    achievementsImgs.push(
                        '/achievements/answers20.png',
                        '/achievements/answers150.png'
                    );
                    break;
                case total >= 20:
                    setAchievements((prev: number) => prev + 1);
                    achievementsImgs.push('/achievements/answers20.png');
                    break;
                default:
                    break;
            }
            
            
        }
        // Adding Achivements over leaderboard rank 
        if(leaderboard){
            switch(leaderboard){
                case 1:
                    setAchievements((prev:number)=> prev + 1)
                    achievementsImgs.push('/achievements/top1.png')
                    break;
                case 2:
                    setAchievements((prev:number)=> prev + 1)
                    achievementsImgs.push('/achievements/top2.png')
                    break;
                case 3:
                    setAchievements((prev:number)=> prev + 1)
                    achievementsImgs.push('/achievements/top3.png')
                    break;
                default:
                    break;
            }
        }
    },[userInfo])



    return(
        <div className="flex-1 flex flex-col pt-10 px-10 w-full dark:text-black">
            <div className=" flex flex-row justify-between mb-5 ">
                <h1 className="font-black text-4xl pb-3 text-left dark:text-white">
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
            {!overView && !todo ? (
                <div className="card w-full bg-gradient-to-t from-transparent to-socskyblue">
                    <div className=" w-full h-fit gap-6 rounded-t-xl flex items-center p-4 ">
                        <img
                            className="bg-white rounded-full m-5 shadow-xl p-1  dark:bg-gray-100 w-32 h-32"
                            src={img ? img : "/usericon.png"}
                            alt="User image"
                            width={100}
                            height={100}
                        />
                        <table className="text-center w-full table-auto text-lg bg-gradient-to-t from-socskyblue to-white rounded-xl shadow-md dark:to-socskyblue dark:from-transparent">
                            <thead>
                            <tr className="flex w-full justify-between rounded-t-xl">
                                <th className="flex-1">Rank</th>
                                <th className="flex-1">Leaderboard</th>
                                <th className="flex-1">Modules</th>
                                <th className="flex-1">Correct answers</th>
                                <th className="flex-1">Achievements</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr className="flex w-full justify-between rounded-b-xl dark:text-black">
                                <td className="flex-1">{userInfo.modules > -1 ? rank[userInfo.modules] : 'Loading...'}</td>
                                <td className="flex-1">{userInfo.leaderboard ? userInfo.leaderboard : userInfo.leaderboard === undefined ? '0' : 'Loading...'}</td>
                                <td className="flex-1">{userInfo.modules > -1 ? userInfo.modules : 'Loading...'}</td>
                                <td className="flex-1">{userInfo.totalCorrect > -1 ? userInfo.totalCorrect : "Loading..."}</td>
                                <td className="flex-1">{achievements}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div className=" rounded-b-xl p-5  dark:text-white">
                        <div className="flex justify-evenly">
                            <div className="flex flex-col items-center mb-3 w-[20%]">
                                <h2 className="card-title px-2">
                                    Your achievements : 
                                    {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                                </h2>
                                <div className="flex flex-wrap gap-2">
                                    {achievementsImgs.map((item, key) => (
                                        <Image key={key} src={item} alt={`achivement` + key} width={50} height={50} className=" inline-block bg-white dark:bg-gray-300 rounded-full p-1 shadow-lg border-gray-300 border-solid border"/>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-col items-center mb-3 w-[20%]">
                                <h2 className="card-title px-2">
                                    Your leading module : 
                                    {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                                </h2>
                                <p>
                                    {userInfo.bestAndWorst ?
                                        userInfo.bestAndWorst.bestWeek !== undefined ?
                                        modules[`${Number(userInfo.bestAndWorst.bestWeek)-1}`]
                                        : 'N/A'
                                        : 'Loading...'
                                    } 
                                </p>
                            </div>
                            <div className="flex flex-col items-center mb-3 w-[20%]">
                                <h2 className="card-title px-2">
                                    Your weakest module : 
                                    {/* <div className="badge shadow-md bg-socskyblue">NEW</div> */}
                                </h2>
                                <div className="flex flex-wrap">
                                    {userInfo.bestAndWorst ? 
                                        Number(userInfo.bestAndWorst.worstWeek) !== Number(userInfo.bestAndWorst.bestWeek) ?
                                        userInfo.bestAndWorst.worstWeek !== undefined ?
                                        modules[Number(userInfo.bestAndWorst.worstWeek) - 1] 
                                        : 'N/A'
                                        : 'N/A'
                                        : 'Loading...'
                                    }
                                </div>
                            </div>
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
                                            <h2 className="card-title">To elevate your leading area</h2>
                                            <p>Some Content...</p>
                                        </div>
                                        <div className="flex flex-col">
                                            <h2 className="card-title">To strengthen your weakest area</h2>
                                            <p>Some Content...</p>
                                        </div>

                                    </div>
                                </div>
                            </details>
                        </div>
                    </div>
                </div>
            ) : !todo ? ( 
                <StudentOverview data={data} userData={userData}/>
            ) : (
                <StudentTodo modules={modules}/>
            )
            }
        </div>
    )
}