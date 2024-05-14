'use client'
import React, { useState } from 'react';
import { SubmitButton } from "@/components/Submit";


export default function Quiz({ data, total }: any) {
  const [selected, setSelected] = useState(false);

  const handleInputChange = async (index: number) => {
    const inputs = document.querySelectorAll(`input[name="question_${index}"]:checked`);
    setSelected(inputs.length > 0);
  };

  const submit = async (formData: FormData) => {
    const first = formData.get("question_0") as any;
    console.log(first)
  }

  return (
    <>
    <div className="carousel items-center w-[70%]">
      {data.data.map((item: any, index: number) => (
        <div id={`slide${index}`} key={index} className="carousel-item flex-col items-center w-full">
          <h1 className="text-xl font-bold pb-5">{item.question}</h1>

          <label className="bg-socskyblue px-2 mb-2 rounded-md" htmlFor={`question${index}1`}>
            {item.correct_answer}
            <input className="ml-2 radio radio-xs bg-white border-loginblue" type="radio" id={`question${index}1`} name={`question_${index}`} value={item.correct_answer} onChange={() => handleInputChange(index)} required />
          </label>

          <label className="bg-socskyblue px-2 mb-2 rounded-md" htmlFor={`question${index}2`}>
            {item.incorrect_answer1}
            <input className="ml-2 radio radio-xs bg-white  border-loginblue" type="radio" id={`question${index}2`} name={`question_${index}`} value={item.incorrect_answer1} onChange={() => handleInputChange(index)} required/>
          </label>

          <label className="bg-socskyblue px-2 mb-2 rounded-md" htmlFor={`question${index}3`}>
            {item.incorrect_answer2}
            <input className="ml-2 radio radio-xs bg-white  border-loginblue" type="radio" id={`question${index}3`} name={`question_${index}`} value={item.incorrect_answer2} onChange={() => handleInputChange(index)} required/>
          </label>

          <label className="bg-socskyblue px-2 mb-2 rounded-md" htmlFor={`question${index}4`}>
            {item.incorrect_answer3}
            <input className="ml-2 radio radio-xs bg-white  border-loginblue" type="radio" id={`question${index}4`} name={`question_${index}`} value={item.incorrect_answer3} onChange={() => handleInputChange(index)} required/>
          </label>

          <div className="join grid grid-cols-2 py-5 px-20">

          <a  href={`#slide${index - 1}`} className={`${index ? 'join-item btn btn-outline' : `join-item btn btn-outline text-gray-500 pointer-events-none`}`}>Previous</a>

          {index === total -1 && selected ? (
            <SubmitButton
            formAction={submit}
            className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-4 py-2 text-foreground mb-2 text-black dark:text-black mx-[15%]"
            pendingText="Signing Up..."
            >
              Submit
            </SubmitButton>
          ) : selected ? (
            <a href={`#slide${index + 1}`} className='join-item btn btn-outline'>Next</a>
          ) : (
            <div className="tooltip tooltip-right" data-tip="hello">
              <a href={`#slide${index + 1}`} className='join-item btn btn-outline text-gray-500 pointer-events-none'>
                Next
              </a>
            </div>
          )
          }
          </div>
        </div>
        ))}
    </div> 
    <progress className="progress w-56" value={50} max="100">50%</progress>
    </>
  );
}
