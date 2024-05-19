'use client'
import React, { useEffect, useState } from "react";
import Todo from "./Todo";
import Image from "next/image";

export default function Results({ data }: any) {
    const [passed, setPassed] = useState(false);
    const [improve, setImprove] = useState(false);
    const [quote, setQuote] = useState<string | null>(null);
    const [failedQuestions, setFailedQuestions] = useState<string[]>([]);
    const [failedAnswers, setFailedAnswers] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);
    const week = data.dayQuestions[0].week_number
    const day = data.dayQuestions[0].day_number

    useEffect(() => {
        // Store the loop here
        const failedQ: string[] = [];
        const failedA: string[] = [];
        //Loop and store all incorrect answers and the question for it
        for (let i = 0; i < data.answers.length; i++) {
            if (data.answers[i] !== data.dayQuestions[i].correct_answer) {
                failedQ.push(data.dayQuestions[i].question);
                failedA.push(data.answers[i]);
            }
        }
        // Insert it to the UseStates outside of useEffect
        setFailedQuestions(failedQ);
        setFailedAnswers(failedA);

        // If there`s 1 or more wrong answers we will display them and give advices
        if (failedQ.length > 0) {   
            setImprove(true);     
            const add = async()=>{
                await Todo(failedQ, failedA, week, day)
            }
            add()
        }
        
        // Set if the student passed or not
        setPassed(data.info.success);
    }, [data]);    

    // Fetch a quote and display to user if passed without 1 wrong answer 
    useEffect(() => {
        const category = 'inspirational';
        const apiKey = 'UE2QfJYPQyOtlIBlWK4s0w==MmOtVUASK4Fhe94t';
    
        const fetchData = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://api.api-ninjas.com/v1/quotes?category=${category}`, {
                    headers: {
                        'X-Api-Key': apiKey
                    }
                });
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setQuote(data[0].quote);
            } catch (error) {
                console.error('Error fetching data:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []); // Empty dependency array means this runs once on mount

    const handleTryAgain = () => {
        data.setSubmitted(false);
    };

    return passed ? ( // Here s the answer for the bootcamper who passed the quiz 
        <div>
            <div className="text-center">
                <h1 className=" text-2xl font-medium mb-8 bg-gradient-to-r from-transparent via-green-500 to-transparent py-2">
                    Well done
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
                <h1 className=" text-2xl font-medium mt-5 py-2">
                 Congratulations, you passed!
                </h1>       
            </div>         
            {improve ? ( 
                <>
                <h2 className="my-8 text-xl">Here&apos;s what you can improve on:</h2>
                <table className="table">
                    <thead>
                        <tr>
                            <th></th>
                            <th className="dark:text-gray-300">Questions</th>
                            <th className="dark:text-gray-300">Incorrect answers</th>
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
                <div className="flex flex-col justify-center items-center">
                    <p className="mt-5 font-bold">Why not initiate a chat with SoCBot ?</p>
                    <p className="btn btn-ghost w-[50%] my-5 text-black bg-loginblue shadow-lg border-0 dark:text-white"
                        onClick={data.day < 5 ? () => { data.setSubmitted(false); data.props.setSelected(data.day + 1); data.setAttempts(1) }: undefined}
                    >
                        Next Day
                    </p> 
                </div>
                </>
            ) : (
                <div className="flex flex-col justify-center items-center text-center">
                    <Image src='/chris.png' alt="Chris Meah" width={70} height={70}></Image>
                    {loading ? (
                        <p className=" font-semibold p-2">Loading inspirational quote...</p>
                    ) : (
                        quote && (  
                            <div className=" bg-gray-200 rounded-xl p-2 my-8 dark:text-black">  
                                <p>{quote}</p>
                            </div>
                        
                        )
                    )}
                    <p className="btn btn-ghost w-[50%] text-black bg-loginblue shadow-lg border-0 dark:text-white"
                        onClick={data.day < 5 ? () => { data.setSubmitted(false); data.props.setSelected(data.day + 1); data.setAttempts(1) }: undefined}
                    >
                        Next Day
                    </p> 
                </div>
            )}
        </div>
    ) : (  // Here starts the page if the bootcamper fails the quiz
        <div>
            <div className="text-center">
                <h1 className=" text-2xl font-medium mb-8 bg-gradient-to-r from-transparent via-red-600 to-transparent py-1">
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
                <h2 className="my-6 text-xl font-bold">Here&apos;s what you got wrong:</h2>
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
            <div className="flex flex-col justify-center items-center">
                <p className="mt-5 font-bold">Why not initiate a chat with SoCBot ?</p>
                <p className="btn btn-ghost w-[50%] px-20 my-8 text-black bg-loginblue shadow-lg border-0 dark:text-white"
                    onClick={handleTryAgain}
                >
                    Retake
                </p> 
            </div>  
        </div>
    );
}
