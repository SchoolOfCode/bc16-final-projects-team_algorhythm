import { createClient } from "@/utils/supabase/server";
import Image from "next/image";
import Quiz from "@/components/Quiz";
import DayProgress from "@/components/DayProgress";

export default async function modules({
  searchParams,
}: {
  searchParams: { q: number; content: string; t: string; day: number };
}) {


  const supabase = createClient();

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

  return (
    <div className="flex-1 w-full flex  items-center justify-evenly">
    <div className="flex-col w-[70%] pb-[5%] flex items-center gap-10 animate-fade-up m-10 rounded-3xl">
      <h1 className="text-white font-semibold text-4xl mt-5">
        {searchParams.t}
      </h1>
      <div className="flex w-full items-center px-10">

        <DayProgress searchParams={searchParams}/>

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
            <form className="flex flex-col justify-center items-center">
              <div className="carousel items-center  w-[70%]">

                {data.data.map((item: any, index: number) => (
                  <Quiz props={item} index={index} total={total}  key={index} />
                ))}
            
              </div>
            </form>
          ) : (
            <h1>Failed to load</h1>
          )}
        </div>
        {searchParams.day ? (
        <div className="w-6 h-72 bg-white rounded-full overflow-hidden ml-20 mr-4">
          <div className="w-full bg-green-300 rounded-t-full align-bottom flex flex-col  justify-center" style={{ height: `50%` }}>
            <p className="text-xs pb-2">50%</p>
          </div>
        </div>
        ) : null }
      </div>
    </div>
    </div>
  );
}
