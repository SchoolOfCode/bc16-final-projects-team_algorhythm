'use client'
import React, { useEffect, useState } from "react";


export default function Results({ data }: any) {
    const [passed, setPassed] = useState(false);

    const failedQuestions: string[] = [];
    const failedAnswers: string[] = [];

    for (let i = 0; i < data.answers.length; i++) {
        if (data.answers[i] !== data.dayQuestions[i].correct_answer) {
            failedQuestions.push(data.dayQuestions[i].question);
            failedAnswers.push(data.answers[i]);
        }
    }

    const handleTryAgain = () =>{
        data.setSubmitted(false)
    }


    console.log(data)
    useEffect(() => {
        setPassed(data.info.success);
    }, [data.info.success]);

    return passed ? (
        <h1>Passed</h1>
    ) : (
        <div>
            <div className="text-center">
                <h1 className=" text-2xl font-medium mb-8 bg-gradient-to-r from-transparent via-red-600 to-transparent py-2">
                    Try again...
                </h1>
                <div className="radial-progress text-gray-300 text-2xl shadow-lg" 
                        style={{ 
                            "--value": 100,
                            "--size": "10rem",
                            "--thickness": "15px" 
                        } as React.CSSProperties} // Explicitly type as React.CSSProperties
                        role="progressbar">
                            <div className="radial-progress text-loginblue text-2xl shadow-lg z-50" 
                            style={{ 
                                "--value": `${Math.floor(data.info.count / data.total * 100)}`,
                                "--size": "10rem",
                                "--thickness": "15px" 
                            } as React.CSSProperties} // Explicitly type as React.CSSProperties
                            role="progressbar">
                            {data.info.count}/{data.total}
                            </div>
                </div>
                <h2 className="my-8 text-xl">Here&apos;s what you got wrong:</h2>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th></th>
                        <th className="dark:text-gray-300">Questions</th>
                        <th className="dark:text-gray-300">Your Answers</th>
                    </tr>
                </thead>
                <tbody>
                    {failedQuestions.map((question, index) => (
                        <tr key={index}>
                            <th>{index + 1}</th>
                            <td>{question}</td>
                            <td>{failedAnswers[index]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="flex justify-center">
                <p className="btn btn-ghost px-20 my-5 text-black bg-loginblue shadow-lg border-0 dark:text-white"
                onClick={handleTryAgain}
                >
                    Retake
                </p> 
            </div>  
        </div>
    );
}
