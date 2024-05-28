'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export async function UpdateTodo(task:any){   
    const supabase = createClient()
    //Checking if the user is loged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    const {error} = await supabase
        .from('admintodo')
        .delete()
        .eq('question_title', task.question_title)

    if(error){
        //console.log('Error deleting admin to-do',error)
        return false
    }
        //console.log('It worked')
    return true
}

export async function GetAdminTodo(){
    const supabase = createClient()
    //Checking if the user is loged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }
    
    const {data, error} = await supabase
    .from('admintodo')
    .select('*')
    if(error){
        console.log('Error fetching Admin Todo', error)
    }
    return data
}