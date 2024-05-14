"use client";
import Link from "next/link";
import { useState } from "react";

export default function DayProgress({
  searchParams,
}: {
  searchParams: { q: number; content: string; t: string; day: number; r: any};
}) {
  const defaultSuccess = [false, false, false, false, false];
  const success = searchParams.r.data || defaultSuccess;
  
  const [day1, setDay1] = useState(success[0]?.success === true);
  const [day2, setDay2] = useState(success[1]?.success === true);
  const [day3, setDay3] = useState(success[2]?.success === true);
  const [day4, setDay4] = useState(success[3]?.success === true);
  const [day5, setDay5] = useState(success[4]?.success === true);
  
  return (
    <ul className="steps steps-vertical w-64">
      {!day1 ? (
        <li className="step h-24">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=1"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=1`}
            className="btn shadow-md bg-socskyblue"
          >
            Day 1
          </Link>
        </li>
      ) : (
        <li data-content="✓" className="step h-24 step-info ">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn shadow-md bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 1
            </p>
          </div>
        </li>
      )}
      {!day2 && day1 ? (
        <li className="step h-24">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=2"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=2`}
            className="btn shadow-md bg-socskyblue"
          >
            Day 2
          </Link>
        </li>
      ) : !day1 ? (
        <li  className="step h-24">
          <div className="tooltip tooltip-right" data-tip="Previous">
            <p className="btn shadow-md cursor-not-allowed pointer-events-none">
              Day 2
            </p>
          </div>
        </li>
      ) : (
        <li data-content="✓" className="step h-24 step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn shadow-md bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 2
            </p>
          </div>
        </li>
      )
      }
      {!day3 && day2 ? (
        <li className="step h-24">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=3"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=3`}
            className="btn shadow-md bg-socskyblue"
          >
            Day 3
          </Link>
        </li>
      ) : !day2 ? (
        <li className="step h-24">
          <div className="tooltip tooltip-right" data-tip="Previous">
            <p className="btn shadow-md cursor-not-allowed pointer-events-none">
              Day 3
            </p>
          </div>
        </li>
      ) : (
        <li data-content="✓" className="step h-24 step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn shadow-md bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 3
            </p>
          </div>
        </li>
      )
      }
      {!day4 && day3 ? (
        <li className="step h-24">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=4"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=4`}
            className="btn shadow-md bg-socskyblue"
          >
            Day 4
          </Link>
        </li>
      ) : !day3 ? (
        <li className="step h-24">
          <div className="tooltip tooltip-right" data-tip="Previous">
            <p className="btn shadow-md cursor-not-allowed pointer-events-none">
              Day 4
            </p>
          </div>
        </li>
      ) : (
        <li data-content="✓" className="step h-24 step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn shadow-md bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 4
            </p>
          </div>
        </li>
      )
      }
      {!day5 && day4 ? (
        <li className="step h-24">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=5"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=5`}
            className="btn shadow-md bg-socskyblue"
          >
            Day 5
          </Link>
        </li>
      ) : !day4 ? (
        <li className="step h-24">
          <div className="tooltip tooltip-right" data-tip="Previous">
            <p className="btn shadow-md cursor-not-allowed pointer-events-none">
              Day 5
            </p>
          </div>
        </li>
      ) : (
        <li data-content="✓" className="step h-24 step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn shadow-md bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 5
            </p>
          </div>
        </li>
      )
      }
    </ul>
  );
}
