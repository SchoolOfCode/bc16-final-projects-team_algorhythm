'use server'
import { createClient } from "@/utils/supabase/server";

export default async function Submit(answers: any, data : any, total: number) {

    const supabase = createClient();

    const user = await supabase
        .from("profiles")
        .select("uuid, first_name, last_name, email");

    const number = 100 / total;
    const goal = 70; // Percentage to pass! 70%

    // score based of 100 / total
    let score = 0;
    // counter to check total of correct answers
    let count = 0;
    // Calculate the score based on the user's answers
    for (let i = 0; i < answers.length; i++) {
        if (answers[i] === data.data[i].correct_answer) {
            score += number;
            count++
        }
    }
    // Check if the user has passed
    const hasPassed = score >= goal;
    // Output the score to the console
    console.log('Score:', score);
    // Output whether the user has passed or failed
    if (hasPassed && user) {
        const { error } = await supabase
            .from("results")
            .insert([{ 
            user_uuid: user.data![0].uuid, 
            first_name: user.data![0].first_name,
            last_name: user.data![0].last_name,
            week_number: data.data[0].week_number,
            day_number: data.data[0].day_number,
            correct_answers: count,
            total_questions: total,
            attempts: 1,
            success: true,
        }])

        if(error){
            console.log('Failed to store result')
        }

        console.log('Congratulations! You passed the quiz.');

        return false
    } else {

        console.log('Sorry, you did not pass the quiz.');

        return true
    }
}
