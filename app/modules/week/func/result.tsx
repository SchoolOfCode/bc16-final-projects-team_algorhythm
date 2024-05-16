'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function fetchResults(week: any) {
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
  
    if(!user){
      redirect('/login')
    }
    const data : any = week ? await supabase
    .from('results')
    .select('*')
    .eq('week_number', week)
    .eq('user_uuid', user.id)
    .order('day_number') : null
  

    return data
}