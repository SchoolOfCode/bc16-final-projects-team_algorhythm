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
  
  const props = {
    data,
    quizzes,
    results,
    user
  }

  return (
    <div className="flex-1 flex flex-col items-center w-full">
      {data && quizzes ? <Week props={props}/> : <h1>Week content not available yet</h1>}  
    </div>
  );
}
