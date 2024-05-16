'use server'
import Image from "next/image";
import Link from "next/link";
import { createClient } from "@/utils/supabase/server";

export default async function WeekCard() {
  const supabase = createClient();
  const { data } = await supabase.from("weeks").select().order("week_number");

  return data ? (
    <>
      {data.map((week, index) => (
        <div key={index} className="card w-96 bg-base-100 m-10 shadow-xl hover:shadow-2xl hover:scale-105 cursor-pointer">
          <Link href={`/modules/week?w=${index + 1}`}>
            <div className="card-body">
              <h2 className="card-title">{week.title}</h2>
              <p>{week.description}</p>
            </div>
            <figure className="bg-sky-200">
              <Image src={`/quizicons/${week.img}.png`} alt={week.title} width={200} height={200} />
            </figure>
          </Link>
        </div>
      ))}
    </>
  ) : (
    <>
    <div className="flex-1 w-full flex items-center justify-evenly">
      <h1>Failed to load Modules</h1>
    </div>
    </>
  );
}
