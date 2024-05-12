import Image from "next/image";
import Link from "next/link";

export default function WeekCard({ props }: any) {
  return (
    <Link
      href="/quizselection/week?q=[week_number]"
      as={`/quizselection/week?q=${props.week_number}`}
    >
      <div className="card w-96 bg-base-100 m-10 shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer">
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <figure className="bg-sky-200">
          <Image src={props.img} alt={props.title} width={200} height={200} />{" "}
          {/* please leave the width and height at 200 otherwise the browser console cries about it */}
        </figure>
      </div>
    </Link>
  );
}
