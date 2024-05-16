'use client'
import { SubmitButton } from "./Submit"
import React,{ useEffect, useState, useRef, use } from "react";

export default function AdminDashBoard({ data }:any){
    const [allData, setAllData] = useState(data)
    const [module, setModule] = useState(0)
    const [day, setDay] = useState(0)
    const [user, setUser] = useState('')
    const [submited,  setSubmited] = useState(false)
    const isFirstRender = useRef(true)
    const [dayCount, setDayCount] = useState(0);
    const [progressBar1, setProgressBar1] = useState(0)
    const [progressBar2, setProgressBar2] = useState(0)
    const [progressBar3, setProgressBar3] = useState(0)
    const [progressBar4, setProgressBar4] = useState(0)


    // function countDayNumbers(data, weekNumber, userUuid) {
    //     let filteredData = data.filter(item => item.week_number === weekNumber && item.user_uuid === userUuid);
    //     let dayNumbers = new Set();
    //     for (let item of filteredData) {
    //         dayNumbers.add(item.day_number);
    //     }
        
    //     return dayNumbers.size;
    // }
    
    

    useEffect(() => {
        if(isFirstRender.current){
            isFirstRender.current = false
        }else{
            const bootCamper = allData.data.filter((obj: { week_number: number; user_uuid: string }) => obj.week_number === Number(module) && obj.user_uuid === user)
            
            if(!bootCamper.length){
                console.log('No quizzes completed in this module')
                return
            }
    
            const dayData = bootCamper.filter((obj: { day_number: number }) => obj.day_number === Number(day));
            if (!dayData.length) {
                console.log('No quizzes completed on this day')
                return
            }
            if (dayData.length) {
                setProgressBar1((dayData[dayData.length-1].correct_answers / dayData[dayData.length-1].total_questions) * 100)
            }
    
            let totalCorrectAnswers = 0;
            let totalQuestions = 0;
            for (let item of bootCamper) {
                totalCorrectAnswers += item.correct_answers;
                totalQuestions += item.total_questions;
            }
    
            let weeklyAverage = totalCorrectAnswers / totalQuestions;
    
            setProgressBar2(weeklyAverage * 100);
            
            let totalDailyCorrectAnswers = 0;
            let totalDailyQuestions = 0;
            for (let item of allData.data) {
                if (item.day_number === Number(day)) {
                    totalDailyCorrectAnswers += item.correct_answers;
                    totalDailyQuestions += item.total_questions;
                }
            }
    
            let dailyAverage = totalDailyCorrectAnswers / totalDailyQuestions;
    
            dailyAverage = Math.round(dailyAverage * 100);
    
            setProgressBar3(dailyAverage);
        }
    }, [module, day, user]);
    
    
    

    const handleSubmit = async(formData: FormData) => {
        const module = formData.get("module") as unknown as number;
        const day = formData.get('day') as unknown as number;
        const user = formData.get('user') as unknown as string;
    //     const dayCount = countDayNumbers(allData.data, module, user);
    // setDayCount(dayCount);
        setModule(module)
        setDay(day)
        setUser(user)
        setSubmited(!submited)
    }

   

    // Create a option for each person on dropdown menu
    const uniqueKeys = new Set();
    const uniqueOptions = allData.data.map((person: any) => {
        const key = `${person.first_name} ${person.last_name}`;
        if (!uniqueKeys.has(key)) {
            uniqueKeys.add(key);
            return (
                <option key={person.user_uuid} value={person.user_uuid}>
                    {person.first_name} {person.last_name}
                </option>
            );
        }
        return null;
    });

    return (
        <>
        <form className="flex flex-row justify-start">
        <select name="module" className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4" required>
          <option value=''>Select module</option>
          <option value='1'>1. Onboarding</option>
          <option value="2">2. Front End</option>
          <option value="3">3. Software Engineer</option>
          <option value="4">4. Back End Engineer</option>
          <option value="5">5. Database Engineer</option>
          <option value="6">6. QA Engineer</option>
          <option value="7">7. Web Developer 1</option>
          <option value="8">8. Web Developer 2</option>
          <option value="9">9. Product</option>
          <option value="10">10. DevOps</option>
          <option value="11">11. Cyber Security</option>
          <option value="12">12. AI and Data</option>
        </select>
        <select name="day" className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4 " required>
          <option value=''>Select day</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
        </select>
        <select name="user" className="select select-bordered w-1/4 max-w-xs bg-loginblue text-white mr-4 " required>
          <option value=''>Select name</option>
          {/* For all names, should be able to be added by the table called 'Profiles' 
          
          call the profiles table
          take first name and lastname
            map across all rows in the table
          make into an option tag
            insert first and last name separately
          
          <option link to uuid of individual bootcamper>
            {call first name} {call last name}
          </option>

          */}
          {uniqueOptions}
        </select>
        <SubmitButton
          formAction={handleSubmit}
          pendingText="Submitting..."
        >
            Submit
        </SubmitButton>
        </form>
        <div className="grid grid-rows-[10vh, 30vh, 10vh] ">
            <div className="grid grid-cols-subgrid col-span-7 justify-items-center items-end h-24 mb-2 ">
            <p className="col-start-2 col-span-2 text-2xl font-bold	">
                Bootcamper
            </p>
            <p className="col-start-5 col-span-2 text-2xl font-bold	">Cohort</p>
            </div>
            <div className="grid grid-cols-subgrid col-span-7 justify-items-center ">
            <div
                className=" mt-5 radial-progress text-loginblue col-start-2  "
                style={{
                "--value": progressBar1,
                /* call the correct row of the answers table for daily score */ "--size":
                    "8rem",
                }}
                role="progressbar"
            >
                {progressBar1 ? `${progressBar1}%` : ''}{" "}
                {/* call the correct row of the answers table for daily score */}
            </div>
            <div
                className=" mt-5 radial-progress text-black  col-start-3  "
                style={{
                "--value": progressBar2,
                /* take the mean average - 5 calls, sum them, divide by number of quizzes that week */ "--size":
                    "8rem",
                }}
                role="progressbar"
            >
                {progressBar2 ? `${progressBar2}%` : ''}{" "}
                {/* take the mean average - 5 calls, sum them, divide by number of quizzes that week */}
            </div>

            {/* <div className="border-r-2 border-black col-start-4 h-40 justify-end"></div> */}
                {/* COHORT DAILY AVERAGE */}
                <div
                    className=" mt-5 radial-progress text-loginblue col-start-5 "
                    style={{
                    "--value": 78,
                    /* take the cohort mean average for the day - sum all daily answers and divide by number of bootcampers who attempted it */ "--size":
                        "8rem",
                    }}
                    role="progressbar"
                >
                    {progressBar3 ? `${progressBar3}%` : ''}{" "}
                    {/* take the cohort mean average for the day - sum all daily answers and divide by number of bootcampers who attempted it */}
                </div>
                {/* COHORT WEEKLY AVERAGE */}
                <div
                    className=" mt-5 radial-progress text-black col-start-6 "
                    style={{
                    "--value": 70,
                    /* take the cohort mean average for the week - sum all daily averages and divide by number of quizzes that week */ "--size":
                        "8rem",
                    }}
                    role="progressbar"
                >
                    70%{" "}
                    {/* take the cohort mean average for the week - sum all daily averages and divide by number of quizzes that week */}
                </div>
            </div>
            <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-lg mt-5 mb-10">
            <p className="col-start-2 ">Daily score</p>
            <p className="col-start-3">Weekly average</p>
            <p className="col-start-5">Daily average</p>
            <p className="col-start-6">Weekly average</p>
            </div>
        </div>
      </>
    )
}