import QuizCard from "@/components/QuizCard";

export default function QuizSelection() {
  const quizData = [
    {
      title: "Week 1",
      description: "Description for Quiz 1",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 2",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 3",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 4",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 5",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 6",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 7",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 8",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 9",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 10",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 11",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    {
      title: "Week 12",
      description: "Description for Quiz 2",
      imageUrl: "/soclogo.png",
    },
    // Add more quiz data objects as needed
  ];

  return (
    <>
      <div className="grid grid-cols-4 gap-4 animate-fade-up">
        {quizData.map((data, index) => (
          <QuizCard props={data} key={index} />
        ))}
      </div>
    </>
  );
}
