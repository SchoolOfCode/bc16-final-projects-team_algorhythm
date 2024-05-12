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

  console.log(searchParams.q);
  console.log(data);

  return data ? (
    <div className="grid grid-cols-4 gap-4 animate-fade-up">
      {data.map((data: any, index: any) => (
        <WeekCard props={data} key={index} />
      ))}
    </div>
  ) : data.length === 0 ? (
    <div className="flex-1 w-full flex  items-center justify-evenly">
      <h1>No questions prepared yet</h1>
    </div>
  ) : (
    <div className="flex-1 w-full flex  items-center justify-evenly">
      <h1>Failed to Load</h1>
    </div>
  );
}
