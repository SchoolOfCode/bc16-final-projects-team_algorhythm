
export default function Quiz({ data }: any) {
  
  return (
      <div className="card bg-base-100 m-2 shadow-xl hover:shadow-2xl p-4 text-center ">
        <h2 className="text-xl font-bold">{data.data[0].question}</h2>
        <p className="hover:scale-105 cursor-pointer">{data.data[0].correct_answer}</p>
        <p className="hover:scale-105 cursor-pointer">
          {data.data[0].incorrect_answer1}
        </p>
        <p className="hover:scale-105 cursor-pointer">
          {data.data[0].incorrect_answer2}
        </p>
        <p className="hover:scale-105 cursor-pointer">
          {data.data[0].incorrect_answer3}
        </p>
    </div>
  );
}
