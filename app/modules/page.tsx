import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import WeekCard from "@/components/WeekCard";

export default async function Modules() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if(!user){
    redirect('/login')
  }
  return (
    <div className="grid grid-cols-4 gap-4 animate-fade-up">
        <WeekCard/>
    </div>
  )
}
