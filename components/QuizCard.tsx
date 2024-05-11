import Image from "next/image";
import Link from "next/link";

export default function QuizCard({ props }: any) {
    return (
    <Link href={'/quizcreation'}>
      <div className="card w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title">{props.title}</h2>
          <p>{props.description}</p>
        </div>
        <figure className="bg-sky-200">
          <Image src={props.imageUrl} alt={props.title} width={200} height={200} />
        </figure>
      </div>
    </Link>
    );

}
