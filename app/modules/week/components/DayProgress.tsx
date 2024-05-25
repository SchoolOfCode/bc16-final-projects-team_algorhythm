"use client";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function DayProgress({ props }: any) {
  const selected = props.selected;
  const completed =
    props.results.data.length !== 0 ? props.results.data : false;

  useEffect(() => {
    if (completed) {
      props.setDay1(
        completed.some(
          (item: any) => item.day_number === 1 && item.success === true,
        ),
      );
      props.setDay2(
        completed.some(
          (item: any) => item.day_number === 2 && item.success === true,
        ),
      );
      props.setDay3(
        completed.some(
          (item: any) => item.day_number === 3 && item.success === true,
        ),
      );
      props.setDay4(
        completed.some(
          (item: any) => item.day_number === 4 && item.success === true,
        ),
      );
      props.setDay5(
        completed.some(
          (item: any) => item.day_number === 5 && item.success === true,
        ),
      );
    } else {
      props.setDay1(false);
      props.setDay2(false);
      props.setDay3(false);
      props.setDay4(false);
      props.setDay5(false);
    }
  }, []);

  useEffect(() => {
    props.setRadialProgress(0);
  }, [props.refresh]);

  return (
    <ul className="steps steps-vertical md:steps-horizontal md:w-[80%] w-64 pt-2 animate-fade-right md:mb-20">
      <li
        className={props.day1 ? "step h-24 step-info" : "step h-24"}
        data-content={props.day1 ? "✓" : "1"}
      >
        {selected || props.day1 ? (
          <p
            className={
              selected === 1
                ? "btn btn-ghost bg-loginblue"
                : "btn btn-ghost bg-gray-300 pointer-events-none dark:text-black"
            }
            onClick={
              selected === 1
                ? () => {
                    props.setSelected(false);
                    props.setRefresh(!props.refresh);
                  }
                : undefined
            }
          >
            Day 1
          </p>
        ) : (
          <p
            className="btn btn-ghost bg-socskyblue hover:bg-loginblue dark:text-black dark:hover:text-white"
            onClick={() => props.setSelected(1)}
          >
            Day 1
          </p>
        )}
      </li>
      <li
        className={props.day2 ? "step h-24 step-info" : "step h-24"}
        data-content={props.day2 ? "✓" : "2"}
      >
        {selected || props.day2 ? (
          <p
            className={
              selected === 2
                ? "btn btn-ghost bg-loginblue"
                : "btn btn-ghost bg-gray-300 pointer-events-none dark:text-black"
            }
            onClick={
              selected === 2
                ? () => {
                    props.setSelected(false);
                    props.setRefresh(!props.refresh);
                  }
                : undefined
            }
          >
            Day 2
          </p>
        ) : (
          <p
            className="btn btn-ghost bg-socskyblue hover:bg-loginblue dark:text-black dark:hover:text-white"
            onClick={() => props.setSelected(2)}
          >
            Day 2
          </p>
        )}
      </li>
      <li
        className={props.day3 ? "step h-24 step-info" : "step h-24"}
        data-content={props.day3 ? "✓" : "3"}
      >
        {selected || props.day3 ? (
          <p
            className={
              selected === 3
                ? "btn btn-ghost bg-loginblue"
                : "btn btn-ghost bg-gray-300 pointer-events-none dark:text-black"
            }
            onClick={
              selected === 3
                ? () => {
                    props.setSelected(false);
                    props.setRefresh(!props.refresh);
                  }
                : undefined
            }
          >
            Day 3
          </p>
        ) : (
          <p
            className="btn btn-ghost bg-socskyblue hover:bg-loginblue dark:text-black dark:hover:text-white"
            onClick={() => props.setSelected(3)}
          >
            Day 3
          </p>
        )}
      </li>
      <li
        className={props.day4 ? "step h-24 step-info" : "step h-24"}
        data-content={props.day4 ? "✓" : "4"}
      >
        {selected || props.day4 ? (
          <p
            className={
              selected === 4
                ? "btn btn-ghost bg-loginblue"
                : "btn btn-ghost bg-gray-300 pointer-events-none dark:text-black"
            }
            onClick={
              selected === 4
                ? () => {
                    props.setSelected(false);
                    props.setRefresh(!props.refresh);
                  }
                : undefined
            }
          >
            Day 4
          </p>
        ) : (
          <p
            className="btn btn-ghost bg-socskyblue hover:bg-loginblue dark:text-black dark:hover:text-white"
            onClick={() => props.setSelected(4)}
          >
            Day 4
          </p>
        )}
      </li>
      <li
        className={props.day5 ? "step h-24 step-info" : "step h-24"}
        data-content={props.day5 ? "✓" : "5"}
      >
        {selected || props.day5 ? (
          <p
            className={
              selected === 5
                ? "btn btn-ghost bg-loginblue"
                : "btn btn-ghost bg-gray-300 pointer-events-none dark:text-black"
            }
            onClick={
              selected === 5
                ? () => {
                    props.setSelected(false);
                    props.setRefresh(!props.refresh);
                  }
                : undefined
            }
          >
            Day 5
          </p>
        ) : (
          <p
            className="btn btn-ghost bg-socskyblue hover:bg-loginblue dark:text-black dark:hover:text-white"
            onClick={() => props.setSelected(5)}
          >
            Day 5
          </p>
        )}
      </li>
    </ul>
  );
}
