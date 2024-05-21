'use server'
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default async function Todo(failedQ:any,failedA:any,week:any,day:any){
    const supabase = createClient();

    const currentTodo:any = []

    const {
        data: { user },
      } = await supabase.auth.getUser();
    
    if (!user) {
        return redirect("/login");
    }

    const todo = await supabase
        .from("todo")
        .select("*")
        .eq('user_uuid', user.id)
        .eq('week_number', week)
        .eq('day_number', day)

    // This IF will only run if the user has items on todo table for this day/week
    if(todo.data!.length > 0){
        //Pushes every todo thats in todo table to this array
        currentTodo.push(...todo.data!)
        // Create a new array to store unique questions with their answers
        const uniqueTodo:any = [];
        // Create a Set to store seen questions
        const seenQuestions = new Set();
        // Create a Set to store questions from currentTodo
        const currentQuestions = new Set(currentTodo.map((item:any) => item.question_title));
        // Iterate over failedQ and check for duplicates
        failedQ.forEach((question:any, index:number) => {
            // Check if the question does not exist in currentTodo
            if (!currentQuestions.has(question)) {
                // Check if the question does not have duplicates
                if (!seenQuestions.has(question)) {
                // Store the unique question with its corresponding answer
                uniqueTodo.push({
                    question_title: question,
                    answer_given: failedA[index]
                });
                // Add the question to the set of seen questions
                seenQuestions.add(question);
                }
            }
        });

        for (const todo of uniqueTodo) {
            const {error} = await supabase
            .from('todo')
            .insert([{
                user_uuid : user.id,
                week_number: week,
                day_number: day,
                question_title: todo.question_title,
                answer_given: todo.answer_given,
            }])
            if(error){
                console.log(error)
                return
            }
        }
        return
    }
    
    // This code only runs if no other todo was present for this day/week
    for(let i = 0; i < failedQ.length; i++){
        const {error} = await supabase
        .from('todo')
        .insert([{
            user_uuid : user.id,
            week_number: week,
            day_number: day,
            question_title: failedQ[i],
            answer_given: failedA[i],
        }])
        if(error){
            console.log(error)
            return
        }
    
    }
    return
}