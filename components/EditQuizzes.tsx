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

    const handleEditQuestion = (uuid, week_number, day_number, questionIndex, question) => {
        setEditingQuestion({ uuid, week_number, day_number, questionIndex, question });
    };
    


    const handleSaveQuestion = async (updatedQuestion) => {
       
        const { uuid, week_number, day_number, question } = updatedQuestion;
    const { error } = await supabase
        .from('quizzes')
        .update(question)  // Only update the question object
        .match({ uuid });

        if (!error) {
            setWeeksData(prevWeeksData => {
                const updatedWeeksData = prevWeeksData.map(week => week.week_number === updatedQuestion.week_number ? {
                    ...week,
                    days: week.days.map(day => day.day_number === updatedQuestion.day_number ? {
                        ...day,
                        questions: day.questions.map((question, index) => index === updatedQuestion.questionIndex ? updatedQuestion.question : question),
                    } : day),
                } : week);
    
                // Sort the weeksData array by week_number in reverse order
                return updatedWeeksData.sort((a, b) => b.week_number - a.week_number);
            });
    
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
                    const weekIndex = acc.findIndex(w => w.week_number === curr.week_number);
                    if (weekIndex !== -1) {
                        const dayIndex = acc[weekIndex].days.findIndex(d => d.day_number === curr.day_number);
                        if (dayIndex !== -1) {
                            acc[weekIndex].days[dayIndex].questions.push(curr);
                        } else {
                            acc[weekIndex].days.push({ day_number: curr.day_number, questions: [curr] });
                        }
                    } else {
                        acc.push({ week_number: curr.week_number, days: [{ day_number: curr.day_number, questions: [curr] }] });
                    }
                    return acc;
                }, []);
    
                // Sort the weeksData array by week_number in reverse order
                const sortedWeeksData = groupedByWeek.sort((a, b) => b.week_number - a.week_number);
    
                console.log('Processed Data:', sortedWeeksData);  // Log the processed data
                setWeeksData(sortedWeeksData);
            }
        }
    
        fetchData();
    }, []);
    
    const handleSelectDayInWeek = (week, day_number) => {
        const selectedDayObj = week.days.find(day => day.day_number === day_number);
        setSelectedDay(selectedDayObj);
    };

   return (
        <div className="w-2/3">
            {weeksData.slice().reverse().map((week, index) => (
                <div key={week.week_number} className="collapse collapse-arrow bg-socskyblue ">
                    <input type="checkbox" /> 
                    <div className="collapse-title text-xl font-medium">
                        Week {week.week_number}
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
        {editingQuestion?.week_number === week.week_number && editingQuestion?.day_number === day.day_number && editingQuestion?.questionIndex === questionIndex ? (
            // Render the edit form
            <div>
        <label>Question:</label>
        <input
            value={editingQuestion.question.question}
            onChange={e => setEditingQuestion(prevState => ({ ...prevState, question: { ...prevState.question, question: e.target.value } }))}
        />
        <label>Correct Answer:</label>
        <input
            value={editingQuestion.question.correct_answer}
            onChange={e => setEditingQuestion(prevState => ({ ...prevState, question: { ...prevState.question, correct_answer: e.target.value } }))}
        />
        <label>Incorrect Answer 1:</label>
        <input
            value={editingQuestion.question.incorrect_answer1}
            onChange={e => setEditingQuestion(prevState => ({ ...prevState, question: { ...prevState.question, incorrect_answer1: e.target.value } }))}
        />
        <label>Incorrect Answer 2:</label>
        <input
            value={editingQuestion.question.incorrect_answer2}
            onChange={e => setEditingQuestion(prevState => ({ ...prevState, question: { ...prevState.question, incorrect_answer2: e.target.value } }))}
        />
        <label>Incorrect Answer 3:</label>
        <input
            value={editingQuestion.question.incorrect_answer3}
            onChange={e => setEditingQuestion(prevState => ({ ...prevState, question: { ...prevState.question, incorrect_answer3: e.target.value } }))}
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
                                                    <button onClick={() => handleEditQuestion(question.uuid, week.week_number, day.day_number, questionIndex, question, 'question', question.question)}>Edit</button>

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