import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";
import Quiz from "@/components/Quiz";

export default async function modules({
  searchParams,
}: {
  searchParams: { q: number; content: string; t: string; day: number };
}) {
  const supabase = createClient();

  let data: any = false;

  if (searchParams.day) {
    data = await supabase
      .from("quizzes")
      .select("*")
      .eq("week_number", searchParams.q)
      .eq("day_number", searchParams.day);
  }

  return (
    <div className="flex-1 flex-col w-[80%] flex items-center gap-10 animate-fade-up m-10 rounded-3xl bg-loginblue">
      <h1 className="text-white font-semibold text-4xl mt-5">
        {searchParams.t}
      </h1>
      <div className="flex w-full items-center justify-between px-10">
        <ul className="steps steps-vertical z-50">
          <li className="step step-primary">
            <Link
              href="/modules/week?q=[week_number]&t=[title]&day=1"
              as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=1`}
              className="btn bg-socskyblue"
            >
              Day 1
            </Link>
          </li>

          <li className="step step-primary">
            <Link
              href="/modules/week?q=[week_number]&t=[title]&day=2"
              as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=2`}
              className="btn bg-socskyblue"
            >
              Day 2
            </Link>
          </li>
          <li className="step ">
            <Link
              href="/modules/week?q=[week_number]&t=[title]&day=3"
              as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=3`}
              className="btn bg-socskyblue"
            >
              Day 3
            </Link>
          </li>
          <li className="step ">
            <Link
              href="/modules/week?q=[week_number]&t=[title]&day=4"
              as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=4`}
              className="btn bg-socskyblue"
            >
              Day 4
            </Link>
          </li>
          <li className="step">
            <Link
              href="/modules/week?q=[week_number]&t=[title]&day=5"
              as={`/modules/week?q=${searchParams.q}&t=${searchParams.t}&day=5`}
              className="btn bg-socskyblue"
            >
              Day 5
            </Link>
          </li>
        </ul>
        <div className="flex-1 flex flex-col w-full items-center">
          {!searchParams.day ? (
            <>
              <h1 className="text-white font-semibold text-2xl">
                Time to test your knowledge
              </h1>
              <Image
                src={`/quizicons/${searchParams.content}.png`}
                alt="Content"
                width={350}
                height={350}
              />
            </>
          ) : data.data[0] !== undefined ? (
            <div className="carousel w-[70%]">
              {data.data.map((item: any, index: number) => (
                <Quiz props={item} index={index} key={index} />
              ))}
            </div>
          ) : (
            <h1>Failed to load</h1>
          )}
        </div>
        {searchParams.day ? (
        <div className="w-6 h-64 bg-white rounded-full overflow-hidden">
          <div className="w-full bg-green-300 rounded-t-full align-bottom flex flex-col  justify-center" style={{ height: `50%` }}>
            <p className="text-xs pb-2">50%</p>
          </div>
        </div>
        ) : null }
      </div>
    </div>
  );
}
