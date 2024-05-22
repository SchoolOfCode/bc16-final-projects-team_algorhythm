import { createClient } from "@supabase/supabase-js";
import { useState, useEffect } from "react";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Question {
  uuid: string;
  question: string;
  correct_answer: string;
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
  title: string;
  days: Day[];
}

interface EditingQuestion {
  uuid: string;
  week_number: number;
  day_number: number;
  questionIndex: number;
  question: Question;
}

export default function EditQuizzes({ weeksNames }: any): JSX.Element {
  const [weeksData, setWeeksData] = useState<Week[]>([]);
  const [editingQuestion, setEditingQuestion] =
    useState<EditingQuestion | null>(null);

  console.log(weeksNames.data);

  const handleEditQuestion = (
    uuid: string,
    week_number: number,
    day_number: number,
    questionIndex: number,
    question: Question
  ) => {
    setEditingQuestion({
      uuid,
      week_number,
      day_number,
      questionIndex,
      question,
    });
  };


  const handleDeleteQuestion = async (uuid: string) => {
    const { error } = await supabase
      .from("quizzes")
      .delete()
      .match({ uuid });
  
    if (!error) {
      setWeeksData((prevWeeksData) =>
        prevWeeksData.map((week) =>
          week.week_number === editingQuestion?.week_number
            ? {
                ...week,
                days: week.days.map((day) =>
                  day.day_number === editingQuestion?.day_number
                    ? {
                        ...day,
                        questions: day.questions.filter(
                          (q, index) => index !== editingQuestion?.questionIndex
                        ),
                      }
                    : day
                ),
              }
            : week
        )
      );
  
      setEditingQuestion(null);
    }
  };
  

  const handleSaveQuestion = async (updatedQuestion: EditingQuestion) => {
    const { uuid, question } = updatedQuestion;
    const { error } = await supabase
      .from("quizzes")
      .update(question)
      .match({ uuid });

    if (!error) {
      setWeeksData((prevWeeksData) =>
        prevWeeksData
          .map((week) =>
            week.week_number === updatedQuestion.week_number
              ? {
                  ...week,
                  days: week.days.map((day) =>
                    day.day_number === updatedQuestion.day_number
                      ? {
                          ...day,
                          questions: day.questions.map((q, index) =>
                            index === updatedQuestion.questionIndex
                              ? updatedQuestion.question
                              : q
                          ),
                        }
                      : day
                  ) 
                  .sort((a, b) => a.day_number - b.day_number),
                }
              : week
          )
          .sort((a, b) => b.week_number - a.week_number)
      );

      setEditingQuestion(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const { data: quizzesData, error: quizzesError } = await supabase
        .from("quizzes")
        .select("*");


      if (quizzesError) {
        console.error("Error fetching data:", quizzesError);
        return;
      }

      if (quizzesData && weeksNames.data) {
        console.log(weeksNames.data);
        const groupedByWeek = quizzesData.reduce<Week[]>((acc, curr) => {
          const weekIndex = acc.findIndex(
            (w) => w.week_number === curr.week_number
          );
          const weekTitle = weeksNames.data.find(
            (w:any) => w.week_number === curr.week_number
          )?.title;

          if (weekIndex !== -1) {
            const dayIndex = acc[weekIndex].days.findIndex(
              (d) => d.day_number === curr.day_number
            );
            if (dayIndex !== -1) {
              acc[weekIndex].days[dayIndex].questions.push(curr);
            } else {
              acc[weekIndex].days.push({
                day_number: curr.day_number,
                questions: [curr],
              });
            }
          } else {
            acc.push({
              week_number: curr.week_number,
              title: weekTitle,
              days: [{ day_number: curr.day_number, questions: [curr] }],
            });
          }
          return acc;
        }, []);

        const sortedWeeksData = groupedByWeek.sort(
          (a, b) => b.week_number - a.week_number
        );
        console.log(sortedWeeksData);
        setWeeksData(sortedWeeksData);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="flex items-center justify-center my-10 w-full">
    <div className="w-2/3 ">
      {weeksData
        .slice()
        .reverse()
        .map((week:any) => (
          <div
            key={week.week_number}
            className="collapse collapse-arrow bg-socskyblue dark:bg-loginblue"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium ">
              Week {week.week_number}: {week.title}
            </div>
            <div className="collapse-content">
              {week.days.map((day:any) => (
                <div key={day.day_number} className="collapse bg-base-200">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium ">
                    Day {day.day_number}
                  </div>
                  <div className="collapse-content">
                    {day.questions.map((question:any, questionIndex:any) => (
                      <div key={questionIndex}>
                        {editingQuestion?.week_number === week.week_number &&
                        editingQuestion?.day_number === day.day_number &&
                        editingQuestion?.questionIndex === questionIndex ? (
                          <div className="flex flex-col space-y-4">
  
                          <label className="font-medium ">Question:
                            <textarea className="ml-2 w-3/4 dark:bg-white dark:text-black " rows={1}
                              value={editingQuestion!.question.question}
                              onChange={(e) =>
                                setEditingQuestion((prevState) => ({
                                  ...prevState!,
                                  question: {
                                    ...prevState!.question,
                                    question: e.target.value,
                                  },
                                }))
                              }
                              
                            />
                          </label>
                          <label className="font-medium text-green dark:text-darkmodegreen">Correct Answer:
                          <textarea className="ml-2 w-3/4 text-black dark:bg-white dark:text-black" rows={1}
                              value={editingQuestion!.question.correct_answer}
                              onChange={(e) =>
                                setEditingQuestion((prevState) => ({
                                  ...prevState!,
                                  question: {
                                    ...prevState!.question,
                                    correct_answer: e.target.value,
                                  },
                                }))
                              }
                            />
                          </label>
                          <label className="font-medium text-red dark:text-darkmodered">Incorrect Answer 1:
                          <textarea className="ml-2 w-3/4 text-black dark:bg-white dark:text-black" rows={1}
                              value={editingQuestion!.question.incorrect_answer1 || ""}
                              onChange={(e) =>
                                setEditingQuestion((prevState) => ({
                                  ...prevState!,
                                  question: {
                                    ...prevState!.question,
                                    incorrect_answer1: e.target.value,
                                  },
                                }))
                              }
                            />
                          </label>
                          <label className="font-medium text-red dark:text-darkmodered">Incorrect Answer 2:
                          <textarea className="ml-2 w-3/4 text-black dark:bg-white dark:text-black" rows={1}
                              value={editingQuestion!.question.incorrect_answer2 || ""}
                              onChange={(e) =>
                                setEditingQuestion((prevState) => ({
                                  ...prevState!,
                                  question: {
                                    ...prevState!.question,
                                    incorrect_answer2: e.target.value,
                                  },
                                }))
                              }
                            />
                          </label>
                          <label className="font-medium text-red dark:text-darkmodered">Incorrect Answer 3:
                          <textarea className="ml-2 w-3/4 text-black dark:bg-white dark:text-black" rows={1}
                              value={editingQuestion!.question.incorrect_answer3 || ""}
                              onChange={(e) =>
                                setEditingQuestion((prevState) => ({
                                  ...prevState!,
                                  question: {
                                    ...prevState!.question,
                                    incorrect_answer3: e.target.value,
                                  },
                                }))
                              }
                            />
                          </label>
                          <div className="flex space-x-4">
                          <button className="submit-button w-[20%] text-sm hover:bg-socskyblue bg-loginblue text-white rounded-2xl px-2 py-2 mt-4 text-foreground text-center hover:text-black dark:text-white"
                            onClick={() => handleSaveQuestion(editingQuestion!)}
                          >
                            Save
                          </button>
                          <button className="submit-button w-[20%] text-sm hover:bg-socskyblue bg-loginblue text-white rounded-2xl px-2 py-2 mt-4 text-foreground text-center hover:text-black dark:text-white" onClick={() => handleDeleteQuestion(question.uuid)}>Delete</button>
                        </div>
                        </div>
                        
                        ) : (
                          <div>
                    <div className="py-3">
                            <h3 className="font-semibold">Question {questionIndex + 1}</h3>
                            <p>{question.question}</p>
                            </div>
                            <p className="font-medium"> <span className="text-green dark:text-darkmodegreen ">Correct Answer:</span><span className="font-normal"> {question.correct_answer} </span></p>
                            <p className="font-medium text-red dark:text-darkmodered ">Incorrect Answers:</p>
                            <ul>
                              <li className="font-normal">{question.incorrect_answer1}</li>
                              <li className="font-normal">{question.incorrect_answer2}</li>
                              <li className="font-normal">{question.incorrect_answer3}</li>
                            </ul>
                            <button className="submit-button w-[20%] text-sm hover:bg-socskyblue bg-loginblue text-white rounded-2xl px-2 py-2 mt-4 text-foreground text-center hover:text-black dark:text-white"
                              onClick={() =>
                                handleEditQuestion(
                                  question.uuid,
                                  week.week_number,
                                  day.day_number,
                                  questionIndex,
                                  question
                                )
                              }
                            >
                              Edit
                            </button>
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
</div>
  );
}
