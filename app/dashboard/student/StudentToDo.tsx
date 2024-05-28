import React,{ useEffect, useState } from "react";
import {GetUserTodo, UpdateTodo} from "./UpdateTodo";

export default function StudentTodo({ weeksNames }: any){
    const [todo, setTodo] = useState<any>({})
    const [groupedTasks, setGroupedTasks] = useState<any>([])
    
    // Deletes todo from UI and also calls a function to delete from DB.
    const deleteTodo = async(task:any) => {
        const response = await UpdateTodo(task)
        if(response){
            setTodo(todo.filter((each:any) => each.question_title !== task.question_title))
        }
    }   

    useEffect(()=>{
        // Fetch todo list from DB for the user
        const getTodo = async() =>{
            const data = await GetUserTodo()
            setTodo(data.data)
        }
        getTodo()
    },[])

    useEffect(()=>{
        // This code will only run after the useEffect above adds the new value for the todo.
        if(Array.isArray(todo)){
            // order todo by week and day
            const tasks = todo.reduce((weeks:any, task:any) => {
                if (!weeks[task.week_number]) {
                    weeks[task.week_number] = {};
                }
                if (!weeks[task.week_number][task.day_number]) {
                    weeks[task.week_number][task.day_number] = [];
                }
                weeks[task.week_number][task.day_number].push(task);
                return weeks;
            }, {});
            setGroupedTasks(tasks)
        }
    },[todo])

    return (
        <div className="card w-full bg-gradient-to-t from-transparent to-socskyblue p-12 ">

            <h2 className=" text-3xl font-bold mb-6">To-Do</h2>
            <p className="text-gray-600 mb-4 font-semibold">Time to refine your weaker points!</p>

            {Object.keys(groupedTasks).length > 0 ? (
            Object.keys(groupedTasks).map(weekNumber => (
                <div key={`week-${weekNumber}`} className="collapse collapse-arrow hover:bg-loginblue transition ease-in-out delay-150 border-2">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title text-xl font-medium peer-checked:bg-loginblue shadow-lg pb-0 dark:bg-socskyblue">
                        {weeksNames.data[Number(weekNumber)-1].title} - Week {weekNumber}
                    </div>
                    <div className="collapse-content peer-checked:bg-white shadow-lg p-0">
                        {Object.keys(groupedTasks[weekNumber]).map(dayNumber => (
                            <div key={`week-${weekNumber}-day-${dayNumber}`} className="collapse rounded-none collapse-plus hover:bg-sky-200 transition ease-in-out delay-150">
                                <input type="checkbox" className="peer" />
                                <div className="collapse-title text-lg font-medium peer-checked:bg-sky-200 shadow-lg ">
                                    Day {dayNumber}
                                </div>
                                <div className="collapse-content peer-checked:bg-white shadow-lg">
                                    {groupedTasks[weekNumber][dayNumber].map((task:any) => (
                                        <div key={task.id} className="flex flex-col pt-3 font-semibold gap-1 hover:bg-gray-300 p-3 rounded-xl">
                                            <p>Question: {task.question_title}</p>
                                            <p>Your answer: {task.answer_given}</p>
                                            <div className="flex justify-end gap-6 text-white">
                                                <p className="px-5 py-1 bg-darkmodegreen hover:bg-green font-semibold rounded-lg hover:cursor-pointer"
                                                onClick={()=>deleteTodo(task)}
                                                >Mark as completed</p>
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
                'Well Done, no to-dos'
            )}

        </div>
    )
}