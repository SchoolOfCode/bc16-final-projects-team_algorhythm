import { createClient } from "@/utils/supabase/server";
import Quiz from "@/components/Quiz";
import Link from "next/link";

export default async function QuizSelection({
  searchParams,
}: {
  searchParams: { q: number };
}) {
  const supabase = createClient();
  const { data }: any = await supabase
    .from("quizzes")
    .select("*")
    .eq("week_number", searchParams.q);

  console.log(data);
  return (
    <div className="flex-1 flex-col w-full flex  items-center justify-evenly animate-fade-up">
      <ul className="steps w-6/12">
        <li className="step step-primary">
          <Link
            href="/quizselection/week?q=[week_number]&day=1"
            as={`/quizselection/week?q=${searchParams.q}&day=1`}
            className="btn bg-socskyblue m-10"
          >
            Day 1
          </Link>
        </li>

        <li className="step step-primary">
          <Link
            href="/quizselection/week?q=[week_number]&day=2"
            as={`/quizselection/week?q=${searchParams.q}&day=2`}
            className="btn bg-socskyblue"
          >
            Day 2
          </Link>
        </li>
        <li className="step ">
          <Link
            href="/quizselection/week?q=[week_number]&day=3"
            as={`/quizselection/week?q=${searchParams.q}&day=3`}
            className="btn bg-socskyblue"
          >
            Day 3
          </Link>
        </li>
        <li className="step ">
          <Link
            href="/quizselection/week?q=[week_number]&day=4"
            as={`/quizselection/week?q=${searchParams.q}&day=4`}
            className="btn bg-socskyblue"
          >
            Day 4
          </Link>
        </li>
        <li className="step">
          <Link
            href="/quizselection/week?q=[week_number]&day=5"
            as={`/quizselection/week?q=${searchParams.q}&day=5`}
            className="btn bg-socskyblue"
          >
            Day 5
          </Link>
        </li>
      </ul>
      <p>Test</p>
    </div>
  );
}
