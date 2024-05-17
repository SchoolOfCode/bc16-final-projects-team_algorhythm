import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

export default function EditQuizzes() {
    const [weeksData, setWeeksData] = useState([]);
    const [selectedDay, setSelectedDay] = useState(null);

    useEffect(() => {
        async function fetchData() {
            let { data, error } = await supabase.from('quizzes').select('*');
            if (error) console.error('Error: ', error);
            else {
                const groupedByWeek = data.reduce((acc, curr) => {
                    const weekIndex = acc.findIndex(w => w.weekNumber === curr.week_number);
                    if (weekIndex !== -1) {
                        acc[weekIndex].days.push(curr);
                    } else {
                        acc.push({ weekNumber: curr.week_number, days: [curr] });
                    }
                    return acc;
                }, []);
                setWeeksData(groupedByWeek);
                console.log('Fetched and Processed Data:', groupedByWeek);
            }
        }

        fetchData();
    }, []);

    const handleSelectDay = (week, index) => {
        const selectedDayObj = week.days[index];
        setSelectedDay(selectedDayObj);
    };

    return (
        <div>
            <h2>Select a Week:</h2>
            <ul>
                {weeksData.map((week, index) => (
                    <li key={week.weekNumber}>
                        <button onClick={() => handleSelectDay(week, index)}>Week {week.weekNumber}</button>
                    </li>
                ))}
            </ul>

            {selectedDay && (
                <div>
                    <h3>Questions for Day {selectedDay.day_number} of Week {selectedDay.week_number}</h3>
                    <p>{selectedDay.question}</p>
                    <p>Correct Answer: {selectedDay.correct_answer}</p>
                    <p>Incorrect Answers:</p>
                    <ul>
                        <li>{selectedDay.incorrect_answer1}</li>
                        <li>{selectedDay.incorrect_answer2}</li>
                        <li>{selectedDay.incorrect_answer3}</li>
                    </ul>
                </div>
            )}
        </div>
    );
}
