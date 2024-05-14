import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Quiz from "@/components/Quiz";
import DayProgress from "@/components/DayProgress";

export default async function modules({
  searchParams,
}: {
  searchParams: { q: number; content: string; t: string; day: number; r: any};
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let data: any = false;
  let total: number = 0;
  if (searchParams.day) {
    data = await supabase
      .from("quizzes")
      .select("*")
      .eq("week_number", searchParams.q)
      .eq("day_number", searchParams.day);
    total = data.data.length
  }
  
  searchParams.r = await supabase
    .from('results')
    .select('*')
    .eq('user_uuid', user!.id)
    .eq('week_number', searchParams.q)
    .order('day_number')

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      <h1 className="text-black font-semibold text-4xl m-5">
        {searchParams.t}
      </h1>
      <div className="flex items-center w-full justify-evenly">
        <DayProgress searchParams={searchParams}/>
          {!searchParams.day ? (
            <div className="flex flex-col w-[50%] items-center">
              <h1 className="text-black font-semibold text-2xl m-2">
                 Time to test your knowledge
              </h1>
              <Image
                src={`/quizicons/${searchParams.content}.png`}
                alt="Content"
                width={400}
                height={400}
                className="w-full max-w-[400px]"
              />
            </div>
          ) : data.data[0] !== undefined ? (
            <form className="flex flex-col w-[50%] items-center">
              <Quiz data={data} total={total}/>
            </form>
          ) : (
            <h1>Failed to load</h1>
          )}
        <div className="w-64"/>
      </div>
    </div>
  );
}
