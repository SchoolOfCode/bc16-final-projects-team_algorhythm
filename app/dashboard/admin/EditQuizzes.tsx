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
                  ),
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
        console.error("Error fetching data:", quizzesError || weeksError);
        return;
      }

      if (quizzesData && weeksNames.data) {
        console.log(weeksNames.data);
        const groupedByWeek = quizzesData.reduce<Week[]>((acc, curr) => {
          const weekIndex = acc.findIndex(
            (w) => w.week_number === curr.week_number
          );
          const weekTitle = weeksNames.data.find(
            (w) => w.week_number === curr.week_number
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
    <div className="w-2/3">
      {weeksData
        .slice()
        .reverse()
        .map((week) => (
          <div
            key={week.week_number}
            className="collapse collapse-arrow bg-socskyblue"
          >
            <input type="checkbox" />
            <div className="collapse-title text-xl font-medium ">
              Week {week.week_number}: {week.title}
            </div>
            <div className="collapse-content">
              {week.days.map((day) => (
                <div key={day.day_number} className="collapse bg-base-200">
                  <input type="checkbox" />
                  <div className="collapse-title text-xl font-medium">
                    Day {day.day_number}
                  </div>
                  <div className="collapse-content">
                    {day.questions.map((question, questionIndex) => (
                      <div key={questionIndex}>
                        {editingQuestion?.week_number === week.week_number &&
                        editingQuestion?.day_number === day.day_number &&
                        editingQuestion?.questionIndex === questionIndex ? (
                          <div>
                            <label>Question:</label>
                            <input
                              value={editingQuestion.question.question}
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
                            <label>Correct Answer:</label>
                            <input
                              value={editingQuestion.question.correct_answer}
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
                            <label>Incorrect Answer 1:</label>
                            <input
                              value={
                                editingQuestion.question.incorrect_answer1 || ""
                              }
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
                            <label>Incorrect Answer 2:</label>
                            <input
                              value={
                                editingQuestion.question.incorrect_answer2 || ""
                              }
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
                            <label>Incorrect Answer 3:</label>
                            <input
                              value={
                                editingQuestion.question.incorrect_answer3 || ""
                              }
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
                            <button className="submit-button w-[20%] text-sm hover:bg-socskyblue bg-sky-300 text-black rounded-2xl px-2 py-2 mt-4 text-foreground text-center dark:text-black"
                              onClick={() =>
                                handleSaveQuestion(editingQuestion)
                              }
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <div>
                    <div className="py-3">
                            <h3 className="font-semibold">Question {questionIndex + 1}</h3>
                            <p>{question.question}</p>
                            </div>
                            <p>Correct Answer: {question.correct_answer}</p>
                            <p>Incorrect Answers:</p>
                            <ul>
                              <li>{question.incorrect_answer1}</li>
                              <li>{question.incorrect_answer2}</li>
                              <li>{question.incorrect_answer3}</li>
                            </ul>
                            <button className="submit-button w-[20%] text-sm hover:bg-socskyblue bg-sky-300 text-black rounded-2xl px-2 py-2 mt-4 text-foreground text-center dark:text-black"
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
  );
}
