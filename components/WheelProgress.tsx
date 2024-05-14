'use client'
import React, { useState, useEffect } from 'react';

let actual: number;

export function WheelProgress(){
    useEffect(() => {

        
        return () => {

        };
      },[actual]);
    const [percentage, setPercentage] = useState(actual)
    return (
        <div className="radial-progress z-0 text-gray-200" style={{"--value":100}} role="progressbar">
        <div className="radial-progress z-50 relative text-loginblue" style={{"--value":`${percentage}`}} role="progressbar">{percentage}%</div>
        </div>
    )
}

export function handleChanges(number: any){
    const [percentage, setPercentage] = useState(number? number : 0)
    actual = percentage
}