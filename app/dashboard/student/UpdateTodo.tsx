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
        .from('todo')
        .delete()
        .eq('question_title', task.question_title)
        .eq('user_uuid', task.user_uuid)

    if(error){
        console.log('Error deleting to-do',error)
        return false
    }
    
    return true
}

export async function GetUserTodo(){
    const supabase = createClient()
    //Checking if the user is loged in
    const {
        data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
        return redirect("/login");
    }

    // Get user todo list
    const data = await supabase
    .from('todo')
    .select('*')
    .eq('user_uuid', user.id)

    //console.log(data)
    return data
}