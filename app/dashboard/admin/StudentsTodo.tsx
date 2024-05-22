import React, { useEffect, useState } from "react";
import { GetAdminTodo, UpdateTodo } from "./Todo";

export default function StudentsTodo() {
  const [data, setData] = useState<any>([]);
  const [groupedTasks, setGroupedTasks] = useState<any>({});
  const [refresh, setRefresh] = useState(false)

  useEffect(() => {
    const getData = async () => {
      const fetchedData = await GetAdminTodo();
      setData(fetchedData);

      const tasksByWeek: any = {};

      fetchedData!.forEach((task: any) => {
        // Remove user_uuid and id
        delete task.user_uuid;
        delete task.id;

        // Check if the week exists, if not, create it
        if (!tasksByWeek[task.week_number]) {
          tasksByWeek[task.week_number] = {};
        }

        // Check if the day exists, if not, create it
        if (!tasksByWeek[task.week_number][task.day_number]) {
          tasksByWeek[task.week_number][task.day_number] = [];
        }

        // Check for duplicates based on question_title
        const existingTask = tasksByWeek[task.week_number][task.day_number].find(
          (t: any) => t.question_title === task.question_title
        );

        if (existingTask) {
          existingTask.count++; // Increment count if duplicate
        } else {
          task.count = 1; // Initialize count if new task
          tasksByWeek[task.week_number][task.day_number].push(task);
        }
      });

      // Sort tasks within each day by count (descending)
      Object.keys(tasksByWeek).forEach((weekNumber: string) => {
        Object.keys(tasksByWeek[weekNumber]).forEach((dayNumber: string) => {
          tasksByWeek[weekNumber][dayNumber].sort((a: any, b: any) => b.count - a.count);
        });
      });

      setGroupedTasks(tasksByWeek);
    };

    getData();
  }, [refresh]);

  const deleteTodo = (taskToDelete: any, weekNumber: string, dayNumber: string) => {
    const updatedTasks = groupedTasks[weekNumber][dayNumber].filter((task: any) => task !== taskToDelete); 
    
    const deleteFromDb = async() =>{
        const item = await UpdateTodo(taskToDelete)
    }
    deleteFromDb()

    setGroupedTasks((prevState:any) => ({
      ...prevState,
      [weekNumber]: {
        ...prevState[weekNumber],
        [dayNumber]: updatedTasks
      }
    }));

    setRefresh(!refresh)
  };

  return (
    <div className="w-full h-full">
      <h1 className="card-title mb-5">Track the most common mistakes</h1>
      {Object.keys(groupedTasks).length > 0 ? (
        Object.keys(groupedTasks).map((weekNumber: string) => (
          <div key={`week-${weekNumber}`} className="collapse collapse-arrow hover:bg-loginblue transition ease-in-out delay-150 border-2">
            <input type="checkbox" className="peer" />
            <div className="collapse-title text-xl font-medium peer-checked:bg-loginblue shadow-lg pb-0">
              Week {weekNumber}
            </div>
            <div className="collapse-content peer-checked:bg-white shadow-lg p-0">
              {Object.keys(groupedTasks[weekNumber]).map((dayNumber: string) => (
                <div key={`week-${weekNumber}-day-${dayNumber}`} className="collapse rounded-none collapse-plus hover:bg-sky-200 transition ease-in-out delay-150">
                  <input type="checkbox" className="peer" />
                  <div className="collapse-title text-lg font-medium peer-checked:bg-sky-200 shadow-lg">
                    Day {dayNumber}
                  </div>
                  <div className="collapse-content peer-checked:bg-white shadow-lg">
                    {groupedTasks[weekNumber][dayNumber].map((task: any) => (
                      <div key={task.question_title} className="flex flex-col pt-3 font-semibold gap-1 hover:bg-gray-300 p-3 rounded-xl">
                        <p>Question : {task.question_title}</p>
                        <p>Most answer given : {task.answer_given}</p>
                        <p>Wrongly Answered : {task.count}</p>
                        <div className="flex justify-end gap-6 text-white">
                          <p
                            className="px-5 py-1 bg-green-500 font-semibold rounded-lg hover:cursor-pointer hover:bg-green-600"
                            onClick={() => deleteTodo(task, weekNumber, dayNumber)}
                          >
                            Mark as completed
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))
      ) : (
        <p>Well done, all mistakes addressed!</p>
      )}
    </div>
  );
}
