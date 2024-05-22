"use client";
import { SubmitButton } from "@/components/Submit";
import React, { useEffect, useState, useRef, use } from "react";
import QuizCreation from "./QuizCreation";
import EditQuizzes from "./EditQuizzes";
import TableOverview from "./TableOverview";
import EachQuestion from "./EachQuestion";
import StudentsTodo from "./StudentsTodo";

export default function AdminDashBoard({ data, weeksNames, userData, img }: any) {
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

  const [backBtn, setBackBtn] = useState(false);
  const [editQuiz, setEditQuiz] = useState(false);
  const [quizCreation, setQuizCreation] = useState(false);
  const [tableOverview, setTableOverview] = useState(false);
  const [studentsTodo, setStudentsTodo] = useState(false);

  useEffect(() => {
    setBackBtn(editQuiz || quizCreation || tableOverview || studentsTodo);
  }, [editQuiz, quizCreation, tableOverview, studentsTodo]);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
    } else {
      const bootCamper = allData.data.filter(
        (obj: { week_number: number; user_uuid: string }) =>
          obj.week_number === Number(module) && obj.user_uuid === user
      );

      if (!bootCamper.length) {
        console.log("No quizzes completed in this module");
        return;
      }

      const dayData = bootCamper.filter(
        (obj: { day_number: number }) => obj.day_number === Number(day)
      );
      if (!dayData.length) {
        setMessage("No quizzes completed on this day");
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
            dayData[dayData.length - 1].total_questions) *
            100
        );
      }

      let totalCorrectAnswers = 0;
      let totalQuestions = 0;
      for (let item of bootCamper) {
        totalCorrectAnswers += item.correct_answers;
        totalQuestions += item.total_questions;
      }

      let weeklyAverage = totalCorrectAnswers / totalQuestions;

      incrementProgress(setProgressBar2, weeklyAverage * 100);

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

      incrementProgress(setProgressBar3, dailyAverage);

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

      incrementProgress(setProgressBar4, weeklyAverageAll);
    }
  }, [module, day, user]);

  const handleSubmit = async (formData: FormData) => {
    const module = formData.get("module") as unknown as number;
    const day = formData.get("day") as unknown as number;
    const user = formData.get("user") as unknown as string;
    setModule(module);
    setDay(day);
    setUser(user);
    setSubmited(!submited);
  };

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

  const incrementProgress = (bar: any, value: any) => {
    let start = 0;
    const step = value / 100; // This will complete in 100 steps
    const interval = setInterval(() => {
      start += step;
      const roundedValue = Math.ceil(start * 100) / 100; // Round to two decimal places
      if (roundedValue >= value) {
        clearInterval(interval);
        bar(Math.ceil(value));
      } else {
        bar(roundedValue);
      }
    }, 10); // Run every 10ms
  };

  return (
    <div className="flex-1 flex flex-col  pt-10 px-10 w-full ">
      <div className=" flex flex-row justify-between mb-5 ">
        <div className="flex items-center">
          <img
            className="bg-white rounded-full m-5 shadow-xl p-1  dark:bg-gray-200 w-32 h-32"
            src={img ? img : "/usericon.png"}
            alt="User image"
            width={100}
            height={100}
          />
          <h1 className="font-black text-4xl pb-3 text-left ">
            {userData.data![0].first_name}&apos;s Admin Dashboard
          </h1>
        </div>
        <div className="flex gap-5">
          {backBtn ? (
            <p
              className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
              onClick={() => {
                setBackBtn(false);
                setQuizCreation(false);
                setEditQuiz(false);
                setTableOverview(false);
                setStudentsTodo(false);
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </p>
          ) : null}
          <p
            className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
            onClick={() => {
              setStudentsTodo(!studentsTodo);
              setTableOverview(false);
              setQuizCreation(false);
              setEditQuiz(false);
            }}
          >
            Common Mistake
          </p>
          <p
            className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
            onClick={() => {
              setTableOverview(!tableOverview);
              setQuizCreation(false);
              setEditQuiz(false);
              setStudentsTodo(false);
            }}
          >
            Table Overview
          </p>
          <p
            className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
            onClick={() => {
              setQuizCreation(!quizCreation);
              setEditQuiz(false);
              setTableOverview(false);
              setStudentsTodo(false);
            }}
          >
            Create Quiz
          </p>
          <p
            className="hover:bg-socskyblue bg-loginblue text-white cursor-pointer rounded-lg px-6 py-3 text-foreground hover:text-black font-semibold text-sm text-left h-9 flex items-center mt-1"
            onClick={() => {
              setEditQuiz(!editQuiz);
              setQuizCreation(false);
              setTableOverview(false);
              setStudentsTodo(false);
            }}
          >
            Modify Quizzes
          </p>
        </div>
      </div>
      {!editQuiz && !quizCreation && !tableOverview && !studentsTodo ? (
        <>
          <form>
            <h1 className="card-title mb-3 text-2xl">Bootcamper tracker</h1>
            <div className="flex flex-row justify-start align-middle">
              <select
                name="module"
                className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4 text-base"
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
                className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4 text-base"
                required
              >
                <option value="">Select day</option>
                <option value="1">Monday</option>
                <option value="2">Tuesday</option>
                <option value="3">Wednesday</option>
                <option value="4">Thursday</option>
                <option value="5">Friday</option>
              </select>
              <select
                name="user"
                className="select select-bordered w-1/4 max-w-xs bg-loginblue text-white mr-4 text-base"
                required
              >
                <option value="">Select name</option>
                {uniqueOptions}
              </select>

              <SubmitButton
                className="hover:bg-loginblue dark:text-black bg-lightblue text-black rounded-lg px-6 py-1 text-foreground text-base hover:text-white font-semibold mr-5"
                formAction={handleSubmit}
                pendingText="Submitting..."
              >
                Track progress
              </SubmitButton>
            </div>
            <div className="mt-5 flex flex-row justify-start align-middle">
              {/* No quizzes completed today message  */}
              {messageVisibility && (
                <div role="alert" className="alert  w-auto h-auto">
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
                Bootcamper
              </p>
              <p className="col-start-5 col-span-2 text-2xl font-bold	">
                Cohort
              </p>
            </div>
            <div className="grid grid-cols-subgrid col-span-7 justify-items-center ">
              <div className="col-start-2">
                <div
                  className="absolute z-20 mt-5 radial-progress text-loginblue"
                  style={
                    {
                      "--value": progressBar1,
                      "--size": progressBar1 && "8rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  {progressBar1 ? `${progressBar1}%` : ""}{" "}
                </div>
                <div
                  className="z-1 mt-5 radial-progress text-socskyblue shadow-lg"
                  style={
                    { "--value": 100, "--size": "8rem" } as React.CSSProperties
                  }
                  role="progressbar"
                ></div>
              </div>
              <div className="col-start-3">
                <div
                  className="absolute z-20 mt-5 radial-progress text-black"
                  style={
                    {
                      "--value": progressBar2,
                      "--size": progressBar2 && "8rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  {progressBar2 ? `${progressBar2}%` : ""}{" "}
                </div>
                <div
                  className="z-1 mt-5 radial-progress text-lightgrey shadow-lg"
                  style={
                    { "--value": 100, "--size": "8rem" } as React.CSSProperties
                  }
                  role="progressbar"
                ></div>
              </div>
              {/* <div className="border-r-2 border-black col-start-4 h-40 justify-end"></div> */}
              {/* COHORT DAILY AVERAGE */}
              <div className="col-start-5">
                <div
                  className="absolute z-20 mt-5 radial-progress text-loginblue"
                  style={
                    {
                      "--value": progressBar3,
                      "--size": progressBar3 && "8rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  {progressBar3 ? `${progressBar3}%` : ""}{" "}
                </div>
                <div
                  className="z-1 mt-5 radial-progress text-socskyblue shadow-lg"
                  style={
                    { "--value": 100, "--size": "8rem" } as React.CSSProperties
                  }
                  role="progressbar"
                ></div>
              </div>
              {/* COHORT WEEKLY AVERAGE */}
              <div className="col-start-6">
                <div
                  className="absolute z-20 mt-5 radial-progress text-black"
                  style={
                    {
                      "--value": progressBar4,
                      "--size": progressBar4 && "8rem",
                    } as React.CSSProperties
                  }
                  role="progressbar"
                >
                  {progressBar4 ? `${progressBar4}%` : ""}{" "}
                </div>
                <div
                  className="z-1 mt-5 radial-progress text-lightgrey shadow-lg"
                  style={
                    { "--value": 100, "--size": "8rem" } as React.CSSProperties
                  }
                  role="progressbar"
                ></div>
              </div>
            </div>
            <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-lg mt-5 mb-10">
              <p className="col-start-2 ">Day score</p>
              <p className="col-start-3">Week score</p>
              <p className="col-start-5">Day average</p>
              <p className="col-start-6">Week average</p>
            </div>
            <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-xs text-center mb-10 text-slate-400">
              <p className="col-start-2 col-span-2 px-12">
                Displays user score for the selected week & day only.
              </p>
              <p className="col-start-5 col-span-2 px-12">
                Displays the average score across the entire cohort.
              </p>
            </div>
          </div>
          <EachQuestion data={data} />
        </>
      ) : !quizCreation && !tableOverview && !studentsTodo ? (
        <EditQuizzes weeksNames={weeksNames}/>
      ) : !tableOverview && !studentsTodo ? (
        <QuizCreation weeksNames={weeksNames}/>
      ) : !studentsTodo ? (
        <TableOverview data={data} />
      ) : (
        <StudentsTodo />
      )}
    </div>
  );
}
