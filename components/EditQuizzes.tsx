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
    const [editingQuestion, setEditingQuestion] = useState(null);

    const handleEditQuestion = (weekNumber, dayNumber, questionIndex, question, field, value) => {
        setEditingQuestion({ weekNumber, dayNumber, questionIndex, question: { ...question, [field]: value } });
    };
    


    const handleSaveQuestion = async (updatedQuestion) => {
       
        const { error } = await supabase
            .from('quizzes')
            .update(updatedQuestion)
            .match({ id: updatedQuestion.id });

        if (error) {
            console.error('Error updating question:', error);
        } else {
           
            setWeeksData(weeksData.map(week => week.weekNumber === updatedQuestion.weekNumber ? {
                ...week,
                days: week.days.map(day => day.day_number === updatedQuestion.dayNumber ? {
                    ...day,
                    questions: day.questions.map((question, index) => index === updatedQuestion.questionIndex ? updatedQuestion.question : question),
                } : day),
            } : week));

           
            setEditingQuestion(null);
        }
    };


    const handleSelectWeek = (week) => {
        setSelectedWeek(week);
        setSelectedDay(null);  
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
        <div className="w-2/3">
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
                                    {day.questions.map((question, questionIndex) => (
    <div key={questionIndex}>
        {editingQuestion?.weekNumber === week.weekNumber && editingQuestion?.dayNumber === day.day_number && editingQuestion?.questionIndex === questionIndex ? (
            // Render the edit form
            <div>
                <label>Question:</label>
                <input
                    value={editingQuestion.question.question}
                    onChange={e => handleEditQuestion(week.weekNumber, day.day_number, questionIndex, question, 'question', e.target.value)}
                />
                                                    <label>Correct Answer:</label>
                                                    <input
                                                        value={question.correct_answer}
                                                        onChange={e => handleEditQuestion({ ...question, correct_answer: e.target.value })}
                                                    />
                                                    <label>Incorrect Answer 1:</label>
                                                    <input
                                                        value={question.incorrect_answer1}
                                                        onChange={e => handleEditQuestion({ ...question, incorrect_answer1: e.target.value })}
                                                    />
                                                    <label>Incorrect Answer 2:</label>
                                                    <input
                                                        value={question.incorrect_answer2}
                                                        onChange={e => handleEditQuestion({ ...question, incorrect_answer2: e.target.value })}
                                                    />
                                                    <label>Incorrect Answer 3:</label>
                                                    <input
                                                        value={question.incorrect_answer3}
                                                        onChange={e => handleEditQuestion({ ...question, incorrect_answer3: e.target.value })}
                                                    />
                                                   <button onClick={() => handleSaveQuestion(editingQuestion)}>Save</button>
            </div>
        ) : (
                                    
            <div>
            <h3>Question {questionIndex + 1}</h3>
            <p>{question.question}</p>
                                                    <p>Correct Answer: {question.correct_answer}</p>
                                                    <p>Incorrect Answers:</p>
                                                    <ul>
                                                        <li>{question.incorrect_answer1}</li>
                                                        <li>{question.incorrect_answer2}</li>
                                                        <li>{question.incorrect_answer3}</li>
                                                    </ul>
                                                    <button onClick={() => handleEditQuestion(week.weekNumber, day.day_number, questionIndex, 'question', question.question)}>Edit</button>
            </div>
                                            )}
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