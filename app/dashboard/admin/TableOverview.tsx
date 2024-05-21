import React, { useEffect, useState } from "react";

export default function TableOverview({ data }: any) {
  const [usersData, setUsersData] = useState([]);
  const [nameOrder, setNameOrder] = useState("asc");
  const [scoreOrder, setScoreOrder] = useState("asc");
  const [overallScoreOrder, setOverallScoreOrder] = useState("asc");

  useEffect(() => {
    const seenUuids = new Set();
    const users: any = {};

    data.data.forEach((entry: any) => {
      const {
        user_uuid,
        correct_answers,
        total_questions,
        first_name,
        last_name,
        week_number,
        day_number,
      } = entry;
      const score = (correct_answers / total_questions) * 100;

      if (!users[user_uuid]) {
        users[user_uuid] = {
          correct_answers: correct_answers,
          total_questions: total_questions,
          score: Math.round(score),
          user_uuid: user_uuid,
          first_name: first_name,
          last_name: last_name,
          weekly_scores: {
            [week_number]: {
              correct_answers: correct_answers,
              total_questions: total_questions,
              score: Math.round(score),
              days_completed: [day_number],
            },
          },
        };
      } else {
        users[user_uuid].correct_answers += correct_answers;
        users[user_uuid].total_questions += total_questions;
        users[user_uuid].score = Math.round(
          (users[user_uuid].correct_answers /
            users[user_uuid].total_questions) *
            100
        );
        if (!users[user_uuid].weekly_scores[week_number]) {
          users[user_uuid].weekly_scores[week_number] = {
            correct_answers: correct_answers,
            total_questions: total_questions,
            score: Math.round(score),
            days_completed: [day_number],
          };
        } else {
          users[user_uuid].weekly_scores[week_number].correct_answers +=
            correct_answers;
          users[user_uuid].weekly_scores[week_number].total_questions +=
            total_questions;
          users[user_uuid].weekly_scores[week_number].score = Math.round(
            (users[user_uuid].weekly_scores[week_number].correct_answers /
              users[user_uuid].weekly_scores[week_number].total_questions) *
              100
          );
          if (
            !users[user_uuid].weekly_scores[
              week_number
            ].days_completed.includes(day_number)
          ) {
            users[user_uuid].weekly_scores[week_number].days_completed.push(
              day_number
            );
          }
        }
      }

      seenUuids.add(user_uuid);
    });

    Object.values(users).forEach((user: any) => {
      const weeklyScores = user.weekly_scores;
      for (let week in weeklyScores) {
        const { correct_answers, total_questions, days_completed } =
          weeklyScores[week];
        const averageScore = Math.round(
          (correct_answers / total_questions) * 100
        );
        weeklyScores[week].average_score = averageScore;
        weeklyScores[week].days_completed = days_completed.length;
      }
    });

    const sortedUsers: any = Object.values(users).sort((a: any, b: any) => {
      if (a.first_name < b.first_name) {
        return -1;
      }
      if (a.first_name > b.first_name) {
        return 1;
      }
      return 0;
    });

    setUsersData(sortedUsers);
  }, [data]);

  const reverseByName = () => {
    const sortedData = [...usersData].sort((a: any, b: any) => {
      if (nameOrder === "asc") {
        return a.first_name > b.first_name ? -1 : 1;
      } else {
        return a.first_name < b.first_name ? -1 : 1;
      }
    });
    setNameOrder(nameOrder === "asc" ? "desc" : "asc");
    setUsersData(sortedData);
  };

  const reverseByScore = (week: number) => {
    const sortedData = [...usersData].sort((a: any, b: any) => {
      if (scoreOrder === "asc") {
        return (a.weekly_scores[week]?.average_score || 0) >
          (b.weekly_scores[week]?.average_score || 0)
          ? -1
          : 1;
      } else {
        return (a.weekly_scores[week]?.average_score || 0) <
          (b.weekly_scores[week]?.average_score || 0)
          ? -1
          : 1;
      }
    });
    setScoreOrder(scoreOrder === "asc" ? "desc" : "asc");
    setUsersData(sortedData);
  };

  const reverseByOverallScore = () => {
    const sortedData = [...usersData].sort((a: any, b: any) => {
      if (overallScoreOrder === "asc") {
        return a.score > b.score ? -1 : 1;
      } else {
        return a.score < b.score ? -1 : 1;
      }
    });
    setOverallScoreOrder(overallScoreOrder === "asc" ? "desc" : "asc");
    setUsersData(sortedData);
  };

  return (
    <div className="overflow-x-auto mb-10">
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead className="bg-gray-800 text-white">
          <tr>
            <th className="w-10">#</th>
            <th className="px-4 py-2" onClick={reverseByName}>
              Name
            </th>
            <th className="px-4 py-2" onClick={reverseByOverallScore}>
              Overall Score
            </th>
            {[...Array(12)].map((_, i) => (
              <th
                key={i}
                className="px-4 py-2"
                onClick={() => reverseByScore(i + 1)}
              >
                Week {i + 1}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-gray-200">
          {usersData.map((row: any, index: number) => (
            <tr key={index}>
              <td className="border px-4 py-2">{index + 1}</td>
              <td className="border px-4 py-2">{`${row.first_name} ${row.last_name}`}</td>
              <td className="border px-4 py-2">{row.score}%</td>
              {[...Array(12)].map((_, i) => (
                <td key={i} className="border px-4 py-2">
                  {row.weekly_scores[i + 1]
                    ? `${row.weekly_scores[i + 1].average_score}% ${
                        row.weekly_scores[i + 1].days_completed
                      }/5 Days`
                    : "0%"}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
