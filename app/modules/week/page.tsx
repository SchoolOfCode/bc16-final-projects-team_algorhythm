import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Week from "./components/Week";

export default async function modules({
  searchParams,
}: {
  searchParams: { w: number; };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    redirect('/login')
  }
  if(!searchParams.w){
    redirect('/')
  }
  const { data } : any = searchParams.w ? await supabase
    .from("weeks")
    .select("*")
    .eq("week_number", searchParams.w) : null

  const quizzes : any = searchParams.w ? await supabase
    .from('quizzes')
    .select('*')
    .eq('week_number', searchParams.w)
    .order('day_number') : null

  const results : any = searchParams.w ? await supabase
    .from('results')
    .select('*')
    .eq('week_number', searchParams.w)
    .eq('user_uuid', user.id)
    .order('day_number') : null
  
  const week = searchParams.w
  const props = {
    data,
    quizzes,
    results,
    user,
    week
  }
  return (
    <div className="flex-1 flex flex-col items-center w-full">
      {week < 12 ? (
        data && quizzes ? <Week props={props}/> : <h1>Week content not available yet</h1>
      ) : (
        <div className="flex-1 flex flex-col justify-center items center">
          <div className="text-center mt-10">
              <h2 className="text-xl font-semibold mb-2">Oops, Module Unavailable</h2>
              <p className="text-md text-gray-600">Try again later. 😁</p>
          </div>
        </div>
      )}
      

    </div>
  );
}
