import Image from "next/image";
import Link from "next/link";

export default function Quiz({ props }: any) {
  return (
    <div className="card bg-base-100 m-2 shadow-xl hover:shadow-2xl p-4 text-center ">
      <h2 className="text-xl font-bold">{props.question}</h2>
      <p className="hover:scale-105 cursor-pointer">{props.correct_answer}</p>
      <p className="hover:scale-105 cursor-pointer">
        {props.incorrect_answer1}
      </p>
      <p className="hover:scale-105 cursor-pointer">
        {props.incorrect_answer2}
      </p>
      <p className="hover:scale-105 cursor-pointer">
        {props.incorrect_answer3}
      </p>
    </div>
  );
}
