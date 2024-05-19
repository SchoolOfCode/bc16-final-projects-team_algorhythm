import React,{ useState } from "react"


export default function StudentTodo({ todoData, modules }: any){
    const [todo, setTodo] = useState(todoData.data) 

    // Group tasks by week and day
    const groupedTasks = todo.reduce((weeks:any, task:any) => {
        if (!weeks[task.week_number]) {
            weeks[task.week_number] = {};
        }
        if (!weeks[task.week_number][task.day_number]) {
            weeks[task.week_number][task.day_number] = [];
        }
        weeks[task.week_number][task.day_number].push(task);
        return weeks;
    }, {});

    return (
        <div className="card w-full bg-gradient-to-t from-transparent to-socskyblue p-12">

            <h2 className=" text-3xl font-bold mb-6">To-Do</h2>
            <p className="text-gray-600 mb-4">Time to refine your weaker points!</p>

            {Object.keys(groupedTasks).length > 0 ? (
            Object.keys(groupedTasks).map(weekNumber => (
                <div key={`week-${weekNumber}`} className="collapse collapse-arrow hover:bg-loginblue transition ease-in-out delay-150 border-2">
                    <input type="checkbox" className="peer" />
                    <div className="collapse-title text-xl font-medium peer-checked:bg-loginblue shadow-lg pb-0">
                        {modules[Number(weekNumber)-1]} - Week {weekNumber}
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
                                        <div key={task.id} className="flex flex-col pt-3 font-semibold gap-1">
                                            <p>Question: {task.question_title}</p>
                                            <p>Your answer: {task.answer_given}</p>
                                            <div className="flex justify-end gap-6 text-white">
                                                <p className="px-5 py-1 bg-loginblue font-semibold rounded-lg hover:cursor-pointer">Chat with SoCBot</p>
                                                <p className="px-5 py-1 bg-green-500 font-semibold rounded-lg hover:cursor-pointer">Mark as completed</p>
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
                ''
            )}

        </div>
    )
}