import WeekCard from "@/components/WeekCard";
import { createClient } from "@/utils/supabase/server";

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

  console.log(data)
  return data.length ? (
    <div className="grid grid-cols-4 gap-4 animate-fade-up">
      {data.map((data: any, index: any) => (
        <WeekCard props={data} key={index} />
      ))}
    </div>
  ) : (
    <div className="flex-1 w-full flex  items-center justify-evenly">
      <h1>No questions prepared yet for this week</h1>
    </div>
  )
}
