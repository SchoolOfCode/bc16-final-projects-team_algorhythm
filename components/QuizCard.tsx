import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default function QuizCard({ props }: any) {
  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title">{props.name}</h2>
        <p>{props.description}</p>
      </div>
      <figure className="bg-sky-200">
        <Image src="{props.image}" alt="Quiz" width={200} height={200} />
      </figure>
    </div>
  );
}
