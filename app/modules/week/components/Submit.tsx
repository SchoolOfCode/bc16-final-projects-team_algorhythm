'use server'
import { createClient } from "@/utils/supabase/server";

export default async function Submit(answers : any, dayQuestions : any, total: number) {
    // score based of 100 / total
    // counter to check total of correct answers
    const passed = {
        score: 0,
        count: 0,
        success: false,
    }
    const supabase = createClient();

    const user = await supabase
        .from("profiles")
        .select("uuid, first_name, last_name, email");

    const number = 100 / total;
    const goal = 90; // Percentage to pass! 90%

    

    // Calculate the score based on the user's answers
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === dayQuestions[i].correct_answer) {
            passed.score += number;
            passed.count++
        }
    }
    // Check if the user has passed
    const hasPassed = passed.score >= goal;

    // Output whether the user has passed or failed
    if (hasPassed && user) {
        const { error } = await supabase
            .from("results")
            .insert([{ 
            user_uuid: user.data![0].uuid, 
            first_name: user.data![0].first_name,
            last_name: user.data![0].last_name,
            week_number: dayQuestions[0].week_number,
            day_number: dayQuestions[0].day_number,
            correct_answers: passed.count,
            total_questions: total,
            attempts: 1,
            success: true,
        }])

        if(error){
            console.log('Failed to store result')
        }

        console.log('Congratulations! You passed the quiz.');
        passed.success = true
        return passed
    } else {

        console.log('Sorry, you did not pass the quiz.');
        passed.success = false
        return passed
    }
}
