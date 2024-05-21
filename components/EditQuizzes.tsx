import { createClient } from '@supabase/supabase-js'
import { useState, useEffect } from 'react'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
);

interface Question {
    uuid: string;
    question: string;
    correct_answer?: string;
    incorrect_answer1?: string;
    incorrect_answer2?: string;
    incorrect_answer3?: string;
  }
  
  interface Day {
    day_number: number;
    questions: Question[];
  }
  
  interface Week {
    week_number: number;
    days: Day[];
  }
  
  export default function EditQuizzes(): JSX.Element {
    const [weeksData, setWeeksData] = useState<Week[]>([]);
    const [selectedDay, setSelectedDay] = useState<Day | null>(null);
    const [selectedWeek, setSelectedWeek] = useState<Week | null>(null);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  
    const handleEditQuestion = (uuid: string, week_number: number, day_number: number, questionIndex: number, question: Question) => {
        setEditingQuestion({ uuid, week_number, day_number, questionIndex, question });
      };
      
  
    const handleSaveQuestion = async (updatedQuestion: Question) => {
      const { uuid, week_number, day_number, question } = updatedQuestion;
      const { error } = await supabase
       .from<Question>('quizzes')
       .update(question)
       .match({ uuid });
  
      if (!error) {
        setWeeksData(prevWeeksData => {
          const updatedWeeksData = prevWeeksData.map(week => week.week_number === updatedQuestion.week_number? {
           ...week,
            days: week.days.map(day => day.day_number === updatedQuestion.day_number? {
             ...day,
              questions: day.questions.map((question, index) => index === updatedQuestion.questionIndex? updatedQuestion.question : question),
            } : day),
          } : week);
  
          return updatedWeeksData.sort((a, b) => b.week_number - a.week_number);
        });
  
        setEditingQuestion(null);
      }
    };
  
    const handleSelectWeek = (week: Week) => {
      setSelectedWeek(week);
      setSelectedDay(null);
    };
  
    const handleSelectDay = (day: Day) => {
      setSelectedDay(day);
    };
  
    useEffect(() => {
      async function fetchData() {
        let { data, error } = await supabase.from<Question>('quizzes').select('*');
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
                acc[weekIndex].days.sort((a, b) => b.day_number - a.day_number); // Add this line
              }
            } else {
              acc.push({ week_number: curr.week_number, days: [{ day_number: curr.day_number, questions: [curr] }] });
            }
            return acc;
          }, []);
    
          const sortedWeeksData = groupedByWeek.sort((a, b) => b.week_number - a.week_number);
    
          console.log('Processed Data:', sortedWeeksData);
          setWeeksData(sortedWeeksData);
        }
      }
    
      fetchData();
    }, []);
    
  
    const handleSelectDayInWeek = (week: Week, day_number: number) => {
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
                        {editingQuestion?.week_number === week.week_number && editingQuestion?.day_number === day.day_number && editingQuestion?.questionIndex === questionIndex? (
                          <div>
                            <label>Question:</label>
                            <input
                              value={editingQuestion!.question.question}
                              onChange={e => setEditingQuestion(prevState => ({...prevState, question: {...prevState.question, question: e.target.value } }))}
                            />
                            <label>Correct Answer:</label>
                            <input
                              value={editingQuestion!.question.correct_answer || ''}
                              onChange={e => setEditingQuestion(prevState => ({...prevState, question: {...prevState.question, correct_answer: e.target.value } }))}
                            />
                            <label>Incorrect Answer 1:</label>
                            <input
                              value={editingQuestion!.question.incorrect_answer1 || ''}
                              onChange={e => setEditingQuestion(prevState => ({...prevState, question: {...prevState.question, incorrect_answer1: e.target.value } }))}
                            />
                            <label>Incorrect Answer 2:</label>
                            <input
                              value={editingQuestion!.question.incorrect_answer2 || ''}
                              onChange={e => setEditingQuestion(prevState => ({...prevState, question: {...prevState.question, incorrect_answer2: e.target.value } }))}
                            />
                            <label>Incorrect Answer 3:</label>
                            <input
                              value={editingQuestion!.question.incorrect_answer3 || ''}
                              onChange={e => setEditingQuestion(prevState => ({...prevState, question: {...prevState.question, incorrect_answer3: e.target.value } }))}
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
                            <button onClick={() => handleEditQuestion(question.uuid, week.week_number, day.day_number, questionIndex, question)}>Edit</button>
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
  