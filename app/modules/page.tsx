import WeekCard from "@/components/WeekCard";
import { createClient } from "@/utils/supabase/server";

export default async function Modules() {
  const supabase = createClient();
  const { data } = await supabase.from("weeks").select().order("week_number");

  return data ? (
    <div className="grid grid-cols-4 gap-4 animate-fade-up">
      {data.map((data, index) => (
        <WeekCard props={data} key={index} />
      ))}
    </div>
  ) : (
    <div className="flex-1 w-full flex  items-center justify-evenly">
      <h1>Failed to Load</h1>
    </div>
  );
}
