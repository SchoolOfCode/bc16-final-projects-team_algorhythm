import Image from "next/image";
import Link from "next/link";

export default function WeekCard({ props }: any) {
  return (
      <div className="card w-96 bg-base-100 m-10 shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer">
        <Link
        href="/modules/week?q=[week_number]&content=[content]"
        as={`/modules/week?q=${props.week_number}&content=${props.img}`}
        >
          <div className="card-body">
            <h2 className="card-title">{props.title}</h2>
            <p>{props.description}</p>
          </div>
          <figure className="bg-sky-200">
            <Image src={`/quizicons/${props.img}.png`} alt={props.title} width={200} height={200} />{" "}
            {/* please leave the width and height at 200 otherwise the browser console cries about it */}
          </figure>
        </Link>
      </div>
  );
}
