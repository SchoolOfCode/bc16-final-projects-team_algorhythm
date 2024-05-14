'use client'
import React, { useState, useEffect } from 'react';


export default function WheelProgress(){
    const [percentage, setPercentage] = useState(0)
    return (
        <div className="radial-progress z-0 text-gray-200" style={{"--value":100}} role="progressbar">
        <div className="radial-progress z-50 relative text-loginblue" style={{"--value":`${percentage}`}} role="progressbar">{percentage}%</div>
        </div>
    )
}
