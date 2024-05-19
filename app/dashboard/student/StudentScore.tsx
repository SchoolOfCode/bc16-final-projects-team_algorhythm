

export default async function StudentScore(data:any,userData:any){
        
    const userAllResults = data.data.filter((item:any)=> item.user_uuid === userData.data[0].uuid)
    
    const weekCounts:any = {};
    const weekScores:any = {};
      
    userAllResults.forEach(({ week_number, correct_answers, total_questions }:any) => {
        if (!weekScores[week_number]) {
        weekScores[week_number] = { count: 0, totalCorrect: 0, totalQuestions: 0 };
        }
        weekScores[week_number].count++;
        weekScores[week_number].totalCorrect += correct_answers;
        weekScores[week_number].totalQuestions += total_questions;
        if (weekScores[week_number].count === 5) {
        weekCounts[week_number] = true;
        }
    });

    // Call the function to check the best and worst wekk
    const bestAndWorst: any = findBestAndWorst(weekScores);  // Yes

    // Call the function with data to check the rank of user in the leaderboard
    const leaderboard: any = calculateLeaderboard(data,userData.data[0].uuid); // Yes

    // Call function to sum all correct answers the user give
    const totalCorrect: any = sumTotalCorrect(weekScores) // Yes

    const userInfo = {
        modules: Object.keys(weekCounts).length,
        weekNumbers: Object.keys(weekCounts),
        weekScores,
        bestAndWorst,
        leaderboard,
        totalCorrect
    }
    //console.log(userInfo)
    return userInfo
}
////////////////////// Functions to calculate student data below ///////////////////////////

// Function to calculate leaderboard
function calculateLeaderboard(data: any, connectedUserUuid: string): number | undefined {
    const totalCorrectAnswers: { [key: string]: number } = {}; // Define type explicitly

    // Iterate through the data and sum up the correct answers for each user
    data.data.forEach((record:any) => {
        const { user_uuid, correct_answers } = record;
        totalCorrectAnswers[user_uuid] = (totalCorrectAnswers[user_uuid] || 0) + correct_answers;
    });

    // Sort the users based on their total correct answers
    const sortedUsers = Object.entries(totalCorrectAnswers)
        .sort((a, b) => b[1] - a[1]); // Sort in descending order

    // Find the rank of the connected user
    const connectedUserIndex = sortedUsers.findIndex(user => user[0] === connectedUserUuid);

    // Return the rank of the connected user
    return connectedUserIndex !== -1 ? connectedUserIndex + 1 : undefined;
}

// Sum the total of correct answers
function sumTotalCorrect(leaderboard: { [key: string]: { totalCorrect: number } }): number {
    let total = 0;
    for (const key in leaderboard) {
        if (Object.prototype.hasOwnProperty.call(leaderboard, key)) {
            total += leaderboard[key].totalCorrect;
        }
    }
    return total;
}

// Find best and worst week from the user
function findBestAndWorst(scores:any) {
    let best:any = { score: -Infinity };
    let worst:any = { score: Infinity };

    for (const week in scores) {
        const { totalCorrect, totalQuestions } = scores[week];
        const score = totalCorrect / totalQuestions;

        if (score > best.score) best = { week, score };
        if (score < worst.score) worst = { week, score };
    }

    return { bestWeek: best.week, worstWeek: worst.week };
}




///////// Function to calculate Leader Board (Returns the rank of all users) ////////////

// function calculateLeaderboard(data:any) {
//     const totalCorrectAnswers: { [key: string]: number } = {}; // Define type explicitly

//     // Iterate through the data and sum up the correct answers for each user
//     data.data.forEach((record:any) => {
//         const { user_uuid, correct_answers } = record;
//         totalCorrectAnswers[user_uuid] = (totalCorrectAnswers[user_uuid] || 0) + correct_answers;
//     });

//     // Sort the users based on their total correct answers
//     const sortedUsers = Object.entries(totalCorrectAnswers)
//         .sort((a, b) => b[1] - a[1]); // Sort in descending order

//     // Display the leaderboard
//     console.log("Leaderboard based on total correct answers across all weeks and modules completed:");
//     console.log(sortedUsers)
//     sortedUsers.forEach((user, index) => {
//         const [user_uuid, totalCorrect] = user;
//         console.log(`${index + 1}. User: ${user_uuid}, Total Correct Answers: ${totalCorrect}`);
//     });
// }



