"use client";
import { SubmitButton } from "./Submit";
import React, { useEffect, useState, useRef } from "react";

export default function StudentOverview({ data, userData }: any) {
  const [allData, setAllData] = useState(data);
  const [module, setModule] = useState(0);
  const [day, setDay] = useState(0);
  const [user, setUser] = useState("");
  const [submited, setSubmited] = useState(false);
  const isFirstRender = useRef(true);
  const [progressBar1, setProgressBar1] = useState(0);
  const [progressBar2, setProgressBar2] = useState(0);
  const [progressBar3, setProgressBar3] = useState(0);
  const [progressBar4, setProgressBar4] = useState(0);
  const [message, setMessage] = useState("");
  const [messageVisibility, setMessageVisibility] = useState(false);

  const incrementProgress = (bar: any, value: any) => {
    let start = 0;
    const step = value / 100; // This will complete in 100 steps
    const interval = setInterval(() => {
      start += step;
      const roundedValue = Math.ceil(start * 100) / 100; // Round to two decimal places
      if (roundedValue >= value) {
        clearInterval(interval);
        bar(value);
      } else {
        bar(roundedValue);
      }
    }, 10); // Run every 10ms
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const bootCamper = allData.data.filter(
        (obj: { week_number: number; user_uuid: string }) =>
          obj.week_number === Number(module) && obj.user_uuid === user
      );

      if (!bootCamper.length) {
        setMessage("You haven't completed the quiz for this day");
        setMessageVisibility(true)
        setProgressBar1(0);
        setProgressBar2(0);
        setProgressBar3(0);
        setProgressBar4(0);
        return;
      }

      const dayData = bootCamper.filter(
        (obj: { day_number: number }) => obj.day_number === Number(day)
      );
      if (!dayData.length) {
        setMessage("You haven't completed the quiz for this day");
        setMessageVisibility(true);
        setProgressBar1(0);
        setProgressBar2(0);
        setProgressBar3(0);
        setProgressBar4(0);
        return;
      } else if (dayData.length) {
        setMessage("");
        setMessageVisibility(false);
      }

      if (dayData.length) {
        incrementProgress(
            setProgressBar1,
            (dayData[dayData.length - 1].correct_answers /
            dayData[dayData.length - 1].total_questions) * 100)
      }

      let totalCorrectAnswers = 0;
      let totalQuestions = 0;
      for (let item of bootCamper) {
        totalCorrectAnswers += item.correct_answers;
        totalQuestions += item.total_questions;
      }

      let weeklyAverage = totalCorrectAnswers / totalQuestions;

      incrementProgress(setProgressBar2,weeklyAverage * 100);

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

      incrementProgress(setProgressBar3,dailyAverage); 

      let totalWeeklyCorrectAnswers = 0;
      let totalWeeklyQuestions = 0;
      for (let item of allData.data) {
        if (item.week_number === Number(module)) {
          totalWeeklyCorrectAnswers += item.correct_answers;
          totalWeeklyQuestions += item.total_questions;
        }
      }

      let weeklyAverageAll = totalWeeklyCorrectAnswers / totalWeeklyQuestions;

      weeklyAverageAll = Math.round(weeklyAverageAll * 100);

      incrementProgress(setProgressBar4,weeklyAverageAll);
    }
  }, [module, day, user]);

  const handleSubmit = async (formData: FormData) => {
    const module = formData.get("module") as unknown as number;
    const day = formData.get("day") as unknown as number;
    const user = userData.data[0].uuid
    setModule(module);
    setDay(day);
    setUser(user);
    setSubmited(!submited);
  };


  return (
    <>
      <form>
        <div className="flex flex-row justify-start align-middle">
          <select
            name="module"
            className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4"
            required
          >
            <option value="">Select module</option>
            <option value="1">1. Onboarding</option>
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
          <select
            name="day"
            className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4 "
            required
          >
            <option value="">Select day</option>
            <option value="1">Monday</option>
            <option value="2">Tuesday</option>
            <option value="3">Wednesday</option>
            <option value="4">Thursday</option>
            <option value="5">Friday</option>
          </select>

          <SubmitButton
            className="hover:bg-loginblue bg-lightblue text-black rounded-lg px-6 py-1 text-foreground text-sm hover:text-white font-semibold mr-5 dark:text-black"
            formAction={handleSubmit}
            pendingText="Submitting..."
          >
            Track progress
          </SubmitButton>
        </div>
        <div className="mt-5 flex flex-row justify-start align-middle">
          {/* No quizzes completed today message  */}
          {messageVisibility && (
            <div role="alert" className="alert w-auto h-auto absolute">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="stroke-info shrink-0 w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                ></path>
              </svg>
              <span>{message}</span>
            </div>
          )}
        </div>
      </form>
      <div className="grid grid-rows-[10vh, 30vh, 10vh] ">
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center items-end h-24 mb-2 ">
          <p className="col-start-2 col-span-2 text-2xl font-bold	">
            Your score
          </p>
          <p className="col-start-5 col-span-2 text-2xl font-bold	">Cohort</p>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center ">
          <div className="col-start-2">
            <div
              className="absolute z-20 mt-5 radial-progress text-loginblue shadow-lg"
              style={{
                "--value": progressBar1,
                "--size": "8rem",
              } as React.CSSProperties}
              role="progressbar"
            >
              {progressBar1 ? `${progressBar1}%` : ""}{" "}
            </div>
            <div
              className="z-1 mt-5 radial-progress text-socskyblue"
              style={{ "--value": 100, "--size": "8rem" } as React.CSSProperties}
              role="progressbar"
            ></div>
          </div>
          <div className="col-start-3">
            <div
              className="absolute z-20 mt-5 radial-progress text-black shadow-lg"
              style={{
                "--value": progressBar2,
                "--size": "8rem",
              } as React.CSSProperties}
              role="progressbar"
            >
              {progressBar2 ? `${progressBar2}%` : ""}{" "}
            </div>
            <div
              className="z-1 mt-5 radial-progress text-lightgrey"
              style={{ "--value": 100, "--size": "8rem" } as React.CSSProperties}
              role="progressbar"
            ></div>
          </div>
          {/* <div className="border-r-2 border-black col-start-4 h-40 justify-end"></div> */}
          {/* COHORT DAILY AVERAGE */}
          <div className="col-start-5">
            <div
              className="absolute z-20 mt-5 radial-progress text-loginblue shadow-lg"
              style={{
                "--value": progressBar3,
                "--size": "8rem",
              } as React.CSSProperties}
              role="progressbar"
            >
              {progressBar3 ? `${progressBar3}%` : ""}{" "}
            </div>
            <div
              className="z-1 mt-5 radial-progress text-socskyblue"
              style={{ "--value": 100, "--size": "8rem" }as React.CSSProperties}
              role="progressbar"
            ></div>
          </div>
          {/* COHORT WEEKLY AVERAGE */}
          <div className="col-start-6">
            <div
              className="absolute z-20 mt-5 radial-progress text-black shadow-lg"
              style={{
                "--value": progressBar4,
                "--size": "8rem",
              } as React.CSSProperties}
              role="progressbar"
            >
              {progressBar4 ? `${progressBar4}%` : ""}{" "}
            </div>
            <div
              className="z-1 mt-5 radial-progress text-lightgrey"
              style={{ "--value": 100, "--size": "8rem" } as React.CSSProperties}
              role="progressbar"
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-lg mt-5 mb-10">
          <p className="col-start-2 ">Daily score</p>
          <p className="col-start-3">Week average</p>
          <p className="col-start-5">Daily average</p>
          <p className="col-start-6">Week average</p>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-xs text-center mb-10 text-slate-400">
          <p className="col-start-2 col-span-2 px-12">
            Displays your data for selected week & day only.
          </p>
          <p className="col-start-5 col-span-2 px-12">
            Displays average data across the entire cohort.
          </p>
        </div>
      </div>
    </>
  );
}
