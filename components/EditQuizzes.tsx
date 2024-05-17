import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function EditQuizzes() {
    const [weeksData, setWeeksData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedWeek, setSelectedWeek] = useState(null);

    const handleSelectWeek = (week) => {
        setSelectedWeek(week);
        setSelectedDay(null);  // Clear the selected day when a new week is selected
    };
    
    const handleSelectDay = (day) => {
        setSelectedDay(day);
    };

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase.from('quizzes').select('*');
            if (error) console.error('Error: ', error);
            else {
                console.log('Fetched Data:', data);
                const groupedByWeek = data.reduce((acc, curr) => {
                    const weekIndex = acc.findIndex(w => w.weekNumber === curr.week_number);
                    if (weekIndex !== -1) {
                        const dayIndex = acc[weekIndex].days.findIndex(d => d.day_number === curr.day_number);
                        if (dayIndex !== -1) {
                            acc[weekIndex].days[dayIndex].questions.push(curr);
                        } else {
                            acc[weekIndex].days.push({ day_number: curr.day_number, questions: [curr] });
                        }
                    } else {
                        acc.push({ weekNumber: curr.week_number, days: [{ day_number: curr.day_number, questions: [curr] }] });
                    }
                    return acc;
                }, []);
                console.log('Processed Data:', groupedByWeek);  // Log the processed data
                setWeeksData(groupedByWeek);
            }
        }

        fetchData();
    }, []);

    const handleSelectDayInWeek = (week, dayNumber) => {
        const selectedDayObj = week.days.find(day => day.day_number === dayNumber);
        setSelectedDay(selectedDayObj);
    };

    return (
        <div className="w-1/4">
            {weeksData.slice().reverse().map((week, index) => (
                <div key={week.weekNumber} className="collapse collapse-arrow bg-socskyblue ">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                        Week {week.weekNumber}
                    </div>
                    <div className="collapse-content"> 
                        {week.days.slice().reverse().map((day, index) => (
                            <div key={day.day_number} className="collapse bg-base-200">
                                <input type="checkbox" /> 
                                <div className="collapse-title text-xl font-medium">
                                    Day {day.day_number}
                                </div>
                                <div className="collapse-content"> 
                                    {day.questions.map((question, index) => (
                                        <div key={index}>
                                            <h3>Question {index + 1}</h3>
                                            <p>{question.question}</p>
                                            <p>Correct Answer: {question.correct_answer}</p>
                                            <p>Incorrect Answers:</p>
                                            <ul>
                                                <li>{question.incorrect_answer1}</li>
                                                <li>{question.incorrect_answer2}</li>
                                                <li>{question.incorrect_answer3}</li>
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            ))}
        </div>
    );
    
     }