import QuizCard from "@/components/QuizCard";

export default function QuizSelection() {

    const quizData = [
      { title: "Quiz 1", description: "Description for Quiz 1", imageUrl: "/soclogo.png" },
      { title: "Quiz 2", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 3", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 4", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 5", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 6", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 7", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 8", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 9", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 10", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 11", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      { title: "Quiz 12", description: "Description for Quiz 2", imageUrl: "/soclogo.png" },
      // Add more quiz data objects as needed
    ];
 
  return (
    <>
      <div className="grid grid-cols-4 gap-4">
      {quizData.map((data, index) => (
        <QuizCard
          props={data}
          key={index}
        />
      ))}
      </div>
    </>
  );
}