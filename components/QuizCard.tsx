import Image from "next/image";
import Link from "next/link";

export default function QuizCard({ props }: any) {
  return (
    <Link href={"/quizcreation"}>
      <div className="card w-96 bg-base-100 m-10 shadow-xl hover:shadow-2xl  hover:scale-105">
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <figure className="bg-sky-200">
          <Image
            src={props.img}
            alt={props.title}
            width={200}
            height={133}
          />
        </figure>
      </div>
    </Link>
  );
}
