import WeekCard from "@/components/WeekCard";
import { createClient } from "@/utils/supabase/server";
import Quiz from "@/components/Quiz";

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
  return data.length ? (
    <div className="animate-fade-up">
      {data.map((data: any) => (
        <Quiz props={data} />
      ))}
    </div>
  ) : (
    <div className="flex-1 w-full flex  items-center justify-evenly">
      <h1>No questions prepared yet for this week</h1>
    </div>
  );
}
