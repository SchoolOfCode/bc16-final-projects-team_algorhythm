import { SubmitButton } from "@/components/Submit";
import React, { useState } from "react";

export default function EachQuestion({ data }: any) {
  const [progressBar1, setProgressBar1] = useState(0);
  const [progressBar2, setProgressBar2] = useState(0);
  const [progressBar3, setProgressBar3] = useState(0);
  const [progressBar4, setProgressBar4] = useState(0);
  const [progressBar5, setProgressBar5] = useState(0);
  const [selectedWeek, setSelectedWeek] = useState("");
  const [incompleteParticipants, setIncompleteParticipants] = useState<
    { firstName: string; lastName: string; day: number }[]
  >([]);

  const incrementProgress = (bar: any, value: any) => {
    let start = 0;
    const step = value / 100;
    const interval = setInterval(() => {
      start += step;
      const roundedValue = Math.ceil(start * 100) / 100;
      if (roundedValue >= value) {
        clearInterval(interval);
        bar(Math.ceil(value));
      } else {
        bar(roundedValue);
      }
    }, 10);
  };

  const updateProgress = (progressBar: any, completionRate: number) => {
    incrementProgress(progressBar, completionRate);
  };

  const calculateCompletionRate = (
    weekData: any[],
    day: number,
    allParticipants: Set<string>
  ) => {
    const completedParticipants = new Set(
      weekData
        .filter((item: any) => item.day_number === day && item.success)
        .map((item: any) => item.user_uuid)
    );
    const completionRate =
      (completedParticipants.size / allParticipants.size) * 100;
    updateProgress(getProgressBar(day), completionRate);

    if (completedParticipants.size > 0) {
      const incomplete = Array.from(allParticipants)
        .filter((participant) => !completedParticipants.has(participant))
        .map((participant) => {
          const userData = data.data.find(
            (item: any) => item.user_uuid === participant
          );
          if (userData) {
            return {
              firstName: userData.first_name,
              lastName: userData.last_name,
              day,
            };
          }
          return null;
        })
        .filter((participant) => participant !== null);
      setIncompleteParticipants((prev: any) => [...prev, ...incomplete]);
    }
  };

  const getProgressBar = (day: number) => {
    switch (day) {
      case 1:
        return setProgressBar1;
      case 2:
        return setProgressBar2;
      case 3:
        return setProgressBar3;
      case 4:
        return setProgressBar4;
      case 5:
        return setProgressBar5;
      default:
        return setProgressBar1;
    }
  };

  const dayTracker = (allParticipants: Set<string>) => {
    const filteredData = data.data.filter(
      (item: any) => item.week_number === parseInt(selectedWeek)
    );
    const completedDays = new Set<number>();

    setIncompleteParticipants([]);

    for (let i = 1; i <= 5; i++) {
      const completedParticipants = new Set(
        filteredData
          .filter((item: any) => item.day_number === i && item.success)
          .map((item: any) => item.user_uuid)
      );
      if (completedParticipants.size > 0) {
        completedDays.add(i);
        calculateCompletionRate(filteredData, i, allParticipants);
      } else {
        updateProgress(getProgressBar(i), 0);
      }
    }
  };

  const getAllParticipants = () => {
    const allParticipants = new Set<string>();
    data.data.forEach((item: any) => allParticipants.add(item.user_uuid));
    return allParticipants;
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const selectedWeekValue = formData.get("module") as string;
    setSelectedWeek(selectedWeekValue);
    const allParticipants = getAllParticipants();
    dayTracker(allParticipants);
  };

  const [filterDay, setFilterDay] = useState(null);

  const filterByDay = (day: any) => {
    setFilterDay(day);
  };

  const clearFilter = () => {
    setFilterDay(null);
  };

  const filteredParticipants = filterDay
    ? incompleteParticipants.filter(
        (participant) => participant.day === filterDay
      )
    : incompleteParticipants;
  return (
    <>
      <form onSubmit={handleSubmit}>
        <h1 className="card-title mb-3 text-2xl">Quiz completion</h1>
        <div className="flex flex-row justify-start align-middle">
          <select
            name="module"
            className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4 text-base"
            required
            onChange={(e) => setSelectedWeek(e.target.value)}
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
          <SubmitButton
            className="hover:bg-loginblue dark:text-black bg-lightblue text-black rounded-lg px-6 py-1 text-foreground text-base hover:text-white font-semibold mr-5"
            pendingText="Submitting..."
          >
            Track progress
          </SubmitButton>
        </div>
      </form>
      <div className="grid grid-rows-[10vh, 30vh, 10vh] ">
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center items-end h-24 mb-2 ">
          <p className="col-start-4 text-2xl font-bold absolute">
            Cohort completion
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
          <div className="col-start-4">
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
          <div className="col-start-5">
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
          <div className="col-start-6">
            <div
              className="absolute z-20 mt-5 radial-progress text-loginblue"
              style={
                {
                  "--value": progressBar5,
                  "--size": progressBar5 && "8rem",
                } as React.CSSProperties
              }
              role="progressbar"
            >
              {progressBar5 ? `${progressBar5}%` : ""}{" "}
            </div>
            <div
              className="z-1 mt-5 radial-progress text-socskyblue  shadow-lg"
              style={
                { "--value": 100, "--size": "8rem" } as React.CSSProperties
              }
              role="progressbar"
            ></div>
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-lg mt-5 mb-10">
          <p className="col-start-2">Day 1</p>
          <p className="col-start-3">Day 2</p>
          <p className="col-start-4">Day 3</p>
          <p className="col-start-5">Day 4</p>
          <p className="col-start-6">Day 5</p>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-xs text-center mb-10 text-slate-400">
          <p className="col-start-4 absolute">
            Displays the percentage of completed quizzes per day of the selected week.
          </p>
        </div>
      </div>
      {incompleteParticipants.length > 0 && (
        <div className="my-8">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-semibold">Incomplete quizzes by bootcamper:</h2>
            <div className="flex items-center space-x-2">
              <span className="text-slate-400 text-sm">Filter by Day:</span>
              {[1, 2, 3, 4, 5].map((day) => (
                <button
                  key={day}
                  onClick={() => filterByDay(day)}
                  className={`px-5 py-3 text-sm font-semibold rounded-2xl ${
                    filterDay === day
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700 hover:bg-blue-500 hover:text-white"
                  }`}
                >
                  Day {day}
                </button>
              ))}
              <button
                onClick={clearFilter}
                className="px-5 py-3 text-sm font-semibold rounded-2xl bg-clearbtn hover:bg-darkmodered text-gray-700 hover:bg-red-500 hover:text-white"
              >
                Clear
              </button>
            </div>
          </div>
          {filteredParticipants.length === 0 && filterDay && (
            <p className="text-gray-500 text-lg mb-4 dark:text-gray-300">
              No bootcampers completed the quiz on day {filterDay}.
            </p>
          )}
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {filteredParticipants.map((participant, index) => (
              <div
                key={index}
                className="bg-white dark:bg-gray-500 shadow-md rounded-md p-4 hover:shadow-xl transition duration-300"
              >
                <p className="text-lg font-medium mb-2">
                  {participant?.firstName} {participant?.lastName}
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-200 mb-4">
                  Week {selectedWeek}, Day {participant?.day}
                </p>
                <span className="px-3 py-1 text-xs font-semibold text-red-600 bg-red-100 rounded-full">
                  Incomplete
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}
