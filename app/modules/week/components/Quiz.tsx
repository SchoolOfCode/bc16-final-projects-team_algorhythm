'use client'
import React, { useEffect, useState } from 'react';
import { SubmitButton } from "@/components/Submit";
import Submit from './Submit';
import Results from './Results';

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

  useEffect(()=>{
    setSelected(new Array(total).fill(false))
},[submitted])
  // Holds information about score after submitting the quiz
  let info: any;
  // Holds info insde and also all question and answers
  const [data, setData] = useState({})

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
    props.setRadialProgress(false)
    const day = dayQuestions[0].day_number
    let answers = []

    for(let i = 0; i < 30; i++){
      if(formData.get(`question_${i}`)){
        answers.push(formData.get(`question_${i}`))
      }
    }

    const passed = await Submit(answers,dayQuestions,total)
    
    info = passed

    if(passed.success === true){
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
    setData({info,props,dayQuestions,total,day,answers,setSubmitted})
    setSubmitted(!submitted)
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
          <label key={idx} className="bg-socskyblue p-4 mb-2 rounded-md dark:text-black" htmlFor={`question${index}${label.id}`}>
            {label.text}
            <input className="ml-2 radio radio-xs bg-white border-loginblue dark:focus:bg-loginblue" type="radio" id={`question${index}${label.id}`} name={`question_${index}`} value={label.text} onChange={() => handleInputChange(index)} required />
          </label>
        ))}
      </>
    );
  };
  //////////////// Suffle the answers ///////////////////

  /// Disable stuend to move foward or back on the carousel ///
  document.addEventListener('keydown', function(event) {
    const arrowKeys = ['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight'];
    if(arrowKeys.includes(event.key)) {
        event.preventDefault();
    }
  })
  //
  return (
    <div className='flex flex-col items-center gap-5 mt-2'>
    {!submitted ? (
      <>
        <div className="carousel items-center w-[70%] ">
      {dayQuestions.map((item: any, index: number) => (
        <div id={`slide${index}`} key={index} className="carousel-item flex-col items-center w-full">
          <h1 className="text-xl font-bold mb-10">{item.question}</h1>
          {/* All answers below */}
          {random(item,index)}
          <div className="join grid grid-cols-2 py-5 px-20 mt-5">
          {index ? (
            <a  href={`#slide${index - 1}`} className='join-item btn btn-ghost bg-loginblue'>Previous</a>
          ) : (
            <div className="tooltip tooltip-left w-full" data-tip="First question">
              <a href={`#slide${index - 1}`} className='join-item btn btn-ghost text-black bg-gray-300 pointer-events-none'>
                Previous
              </a>
            </div>)}
          {index === total -1 && selected[index] ? (
            <SubmitButton
            formAction={submit}
            className=" bg-loginblue hover:bg-socskyblue text-black dark:text-white hover:text-black join-item btn btn-ghost"
            pendingText="Submitting..."
            >
              Submit
            </SubmitButton>
          ) : selected[index] ? (
            <a href={`#slide${index + 1}`} className='join-item btn btn-ghost bg-loginblue '>Next</a>
          ) : (
            <div className="tooltip tooltip-right w-full" data-tip="Select a answer">
              <a href={`#slide${index + 1}`} className='join-item btn btn-ghost w-full bg-gray-300 text-black pointer-events-none'>
                Next
              </a>
            </div>)}
          </div>
        </div>
        ))}
        </div> 
        <div>
          <p className='btn dark:hover:bg-gray-700 bg-gray-300 text-black' onClick={()=>props.setSelected(false)}>
          Exit
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3" />
          </svg>
          </p>
        </div>
      </>
    ) : (
      <Results data={data}/>
    )}
    </div>
  );
}