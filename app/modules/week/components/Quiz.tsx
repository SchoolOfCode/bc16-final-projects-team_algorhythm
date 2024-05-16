'use client'
import React, { useEffect, useState } from 'react';
import { SubmitButton } from "@/components/Submit";
import Submit from './Submit';

export default function Quiz({ props }: any) {
  // Get all quizzes from the selected Day
  const dayQuestions = props.quizzes.data.filter((obj:any) => obj.day_number === props.selected)
  // total of question for that day
  const total = dayQuestions.length
  const valueProgressBar = 100 / total

  // State to allow condition to move progress Bar below
  const [answeredQuestions, setAnsweredQuestions] = useState<boolean[]>(new Array(total).fill(false));
  
  // Initialize an array to track selected state for each question
  const [selected, setSelected] = useState<boolean[]>(new Array(total).fill(false));
  const [submitted, setSubmitted] = useState(false)

  // Update the selected state for a specific question index
  const handleInputChange = (index: number) => {
    const inputs = document.querySelectorAll(`input[name="question_${index}"]:checked`);
    const newSelected = [...selected];
    newSelected[index] = inputs.length > 0; // Set to true if at least one input is checked
    setSelected(newSelected);

    //Condition to allow progressbar to move
    // Only increase progress bar if the question hasn't been answered before
    if (!answeredQuestions[index]) {
      props.setRadialProgress((prev: number) => prev + valueProgressBar);
      // Set the question as answered
      const newAnsweredQuestions = [...answeredQuestions];
      newAnsweredQuestions[index] = true;
      setAnsweredQuestions(newAnsweredQuestions);
      if(props.radialProgress >= 100){
        props.setRadialProgress(100)
      }
    };
  }

  // function to handle button submit
  const submit = async (formData: FormData) => {

    const day = dayQuestions[0].day_number
    let answers = []

    for(let i = 0; i < 30; i++){
      if(formData.get(`question_${i}`)){
        answers.push(formData.get(`question_${i}`))
      }
    }

    setSubmitted(!submitted)
    const passed: boolean = await Submit(answers,dayQuestions,total)
    if(passed){
      if(day === 1){
        props.setDay1(true)
      } else if(day === 2){
        props.setDay2(true)
      } else if(day === 3){
        props.setDay3(true)
      } else if(day === 4){
        props.setDay4(true)
      } else if(day === 5){
        props.setDay5(true)
      }
    }
  }
  
  //////////////// Suffle the answers ///////////////////
  const shuffleArray = (array:any, seed:any) => {
    // Custom random number generator
    const customRandom = (min:any, max:any) => {
        const x = Math.sin(seed++) * 10000;
        return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };
    return array.sort(() => customRandom(-1, 1));
  };
  const random = (item:any, index:any) => {
  // Create an array containing the labels
  const labels = [{ text: item.correct_answer, id: 1 },{ text: item.incorrect_answer1, id: 2 },{ text: item.incorrect_answer2, id: 3 },{ text: item.incorrect_answer3, id: 4 }];
  // Generate a unique seed based on the item data, index, and current timestamp
  const seed = item.correct_answer.length + item.incorrect_answer1.length + item.incorrect_answer2.length + item.incorrect_answer3.length + index;
  // Shuffle the array using the seed
  const shuffledLabels = shuffleArray(labels, seed);
  // Render the shuffled labels
  return (
      <>
        {shuffledLabels.map((label:any, idx:any) => (
          <label key={idx} className="bg-socskyblue p-4 mb-2 rounded-md" htmlFor={`question${index}${label.id}`}>
            {label.text}
            <input className="ml-2 radio radio-xs bg-white border-loginblue" type="radio" id={`question${index}${label.id}`} name={`question_${index}`} value={label.text} onChange={() => handleInputChange(index)} required />
          </label>
        ))}
      </>
    );
  };
  //////////////// Suffle the answers ///////////////////
  return (
    <div className='flex flex-col items-center gap-5 mt-5'>
    {!submitted ? (
      <>
      <div className="carousel items-center w-[70%]">
      {dayQuestions.map((item: any, index: number) => (
        <div id={`slide${index}`} key={index} className="carousel-item flex-col items-center w-full">
          <h1 className="text-xl font-bold mb-10">{item.question}</h1>
          {/* All answers below */}
          {random(item,index)}
          <div className="join grid grid-cols-2 py-5 px-20 mt-5">
          {index ? (
            <a  href={`#slide${index - 1}`} className='join-item btn btn-outline'>Previous</a>
          ) : (
            <div className="tooltip tooltip-left w-full" data-tip="First question">
              <a href={`#slide${index - 1}`} className='join-item btn btn-outline text-gray-500 pointer-events-none'>
                Previous
              </a>
            </div>)}
          {index === total -1 && selected[index] ? (
            <SubmitButton
            formAction={submit}
            className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-4 py-2 text-foreground mb-2 text-black dark:text-black mx-[15%]"
            pendingText="Signing Up..."
            >
              Submit
            </SubmitButton>
          ) : selected[index] ? (
            <a href={`#slide${index + 1}`} className='join-item btn btn-outline'>Next</a>
          ) : (
            <div className="tooltip tooltip-right w-full" data-tip="Select a answer">
              <a href={`#slide${index + 1}`} className='join-item btn btn-outline w-full text-gray-500 pointer-events-none'>
                Next
              </a>
            </div>)}
          </div>
        </div>
        ))}
    </div> 
    </>
    ) : (
      <h1>Submitted</h1>
    )}
  </div>
  );
}