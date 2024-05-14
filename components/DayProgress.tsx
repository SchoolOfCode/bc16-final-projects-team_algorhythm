'use client'
import Link from "next/link"
import { useState } from "react";

export default function DayProgress({
    searchParams,
  }: {
    searchParams: { q: number; content: string; t: string; day: number; r: any };
  }) {
    let success = false
    if(searchParams.r.data[0].success){
      success = searchParams.r.data[0].success
    }

    const [day1, setDay1] = useState(false)
    const [day2, setDay2] = useState(false)
    const [day3, setDay3] = useState(false)
    const [day4, setDay4] = useState(false)
    const [day5, setDay5] = useState(false)

    const handleClick = (setday:any,day:any) => {
      setday(!day)
    }

    return(
      <ul className="steps steps-vertical ">
          {!success ? ( 
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
                <button className="btn bg-gray-300 cursor-not-allowed pointer-events-none">Day 1</button>
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