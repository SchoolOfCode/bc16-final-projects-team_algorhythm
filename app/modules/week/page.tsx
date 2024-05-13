import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function modules({
  searchParams,
}: {
  searchParams: { q: number; content: string; t: string };
}) {
  const supabase = createClient();
  const { data }: any = await supabase
    .from("quizzes")
    .select("*")
    .eq("week_number", searchParams.q);

  return (
    <div className="flex-1 flex-col w-[80%] flex items-center gap-10 animate-fade-up m-10 rounded-3xl bg-loginblue">
      <h1 className="text-white font-semibold text-4xl mt-5">
        {searchParams.t}
      </h1>
      <div className="flex w-full">
        <ul className="steps steps-vertical p-5 z-">
          <li className="step step-primary ">
            <Link
              href="/modules/week?q=[week_number]&day=1"
              as={`/modules/week?q=${searchParams.q}&day=1`}
              className="btn bg-socskyblue"
            >
              Day 1
            </Link>
          </li>

          <li className="step step-primary">
            <Link
              href="/modules/week?q=[week_number]&day=2"
              as={`/modules/week?q=${searchParams.q}&day=2`}
              className="btn bg-socskyblue"
            >
              Day 2
            </Link>
          </li>
          <li className="step ">
            <Link
              href="/modules/week?q=[week_number]&day=3"
              as={`/modules/week?q=${searchParams.q}&day=3`}
              className="btn bg-socskyblue"
            >
              Day 3
            </Link>
          </li>
          <li className="step ">
            <Link
              href="/modules/week?q=[week_number]&day=4"
              as={`/modules/week?q=${searchParams.q}&day=4`}
              className="btn bg-socskyblue"
            >
              Day 4
            </Link>
          </li>
          <li className="step">
            <Link
              href="/modules/week?q=[week_number]&day=5"
              as={`/modules/week?q=${searchParams.q}&day=5`}
              className="btn bg-socskyblue"
            >
              Day 5
            </Link>
          </li>
        </ul>
        <div className="flex-1 flex flex-col w-full items-center absolute">
          <h1 className="text-white font-semibold text-2xl">
            Time to test your knowledge
          </h1>
          <Image
            src={`/quizicons/${searchParams.content}.png`}
            alt="Content"
            width={350}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}
