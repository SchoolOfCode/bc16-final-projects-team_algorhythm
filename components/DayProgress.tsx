'use client'
import Link from "next/link"
import { useState } from "react";

export default function DayProgress({
    searchParams,
  }: {
    searchParams: { q: number; content: string; t: string; day: number; r: any };
  }) {
    let success;
    if(searchParams.r.data[0]){
      success = searchParams.r.data
    }
    
    const [day1, setDay1] = useState(success[0] ? true : false)
    const [day2, setDay2] = useState(success[1] ? true : false)
    const [day3, setDay3] = useState(success[2] ? true : false)
    const [day4, setDay4] = useState(success[3] ? true : false)
    const [day5, setDay5] = useState(success[4] ? true : false)

    const handleClick = (setday:any,day:any) => {
      setday(!day)
    }

    return(
      <ul className="steps steps-vertical w-56">
          {!day1 ? ( 
            <li className="step">
              <Link
              href="/modules/week?q=[week_number]&t=[title]&day=1"
              as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=1`}
              className="btn bg-socskyblue"
              >
                Day 1
              </Link>
            </li>
          ) : (
            <li className="step step-info">
              <div className="tooltip tooltip-right" data-tip="Completed">
                <p className="btn bg-gray-300 cursor-not-allowed pointer-events-none">Day 1</p>
              </div>
            </li>
          )
        }  
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=2"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=2`}
            className="btn bg-socskyblue"
          >
            Day 2
          </Link>
        </li>
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=3"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=3`}
            className="btn bg-socskyblue"
          >
            Day 3
          </Link>
        </li>
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=4"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=4`}
            className="btn bg-socskyblue"
          >
            Day 4
          </Link>
        </li>
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=5"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=5`}
            className="btn bg-socskyblue"
          >
            Day 5
          </Link>
        </li>
      </ul>
    )
}