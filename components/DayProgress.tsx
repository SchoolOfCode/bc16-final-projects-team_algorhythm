"use client";
import Link from "next/link";
import { useState } from "react";

export default function DayProgress({
  searchParams,
}: {
  searchParams: { q: number; content: string; t: string; day: number; r: any };
}) {
  const defaultSuccess = [false, false, false, false, false];
  const successs = searchParams.r.data || defaultSuccess;
  
  const [day1, setDay1] = useState(successs[0]?.success === true);
  const [day2, setDay2] = useState(successs[1]?.success === true);
  const [day3, setDay3] = useState(successs[2]?.success === true);
  const [day4, setDay4] = useState(successs[3]?.success === true);
  const [day5, setDay5] = useState(successs[4]?.success === true);
  
  return (
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
            <p className="btn bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 1
            </p>
          </div>
        </li>
      )}
      {!day2 ? (
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=2"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=2`}
            className="btn bg-socskyblue"
          >
            Day 2
          </Link>
        </li>
      ) : (
        <li className="step step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 2
            </p>
          </div>
        </li>
      )}
      {!day3 ? (
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=3"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=3`}
            className="btn bg-socskyblue"
          >
            Day 3
          </Link>
        </li>
      ) : (
        <li className="step step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 3
            </p>
          </div>
        </li>
      )}
      {!day4 ? (
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=4"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=4`}
            className="btn bg-socskyblue"
          >
            Day 4
          </Link>
        </li>
      ) : (
        <li className="step step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 4
            </p>
          </div>
        </li>
      )}
      {!day5 ? (
        <li className="step">
          <Link
            href="/modules/week?q=[week_number]&t=[title]&day=5"
            as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=5`}
            className="btn bg-socskyblue"
          >
            Day 5
          </Link>
        </li>
      ) : (
        <li className="step step-info">
          <div className="tooltip tooltip-right" data-tip="Completed">
            <p className="btn bg-gray-300 cursor-not-allowed pointer-events-none">
              Day 5
            </p>
          </div>
        </li>
      )}
    </ul>
  );
}
