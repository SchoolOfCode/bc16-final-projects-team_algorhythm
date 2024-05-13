export default function Quiz({ props, index, total }: any) {
  return (
    <div id={`slide${index}`} className="carousel-item flex-col relative w-full">
      {props.question}
        <label htmlFor={'question1'}>
          {props.correct_answer}
          <input className="radio radio-xs bg-white" type="radio" id='question1' name="question" value={props.correct_answer} required/>
        </label>
        <label htmlFor={'question2'}>
          {props.incorrect_answer1}
          <input className="radio radio-xs bg-white" type="radio" id='question2' name="question" value={props.incorrect_answer1} required/>
        </label>
        <label htmlFor={'question3'}>
          {props.incorrect_answer2}
          <input className="radio radio-xs bg-white" type="radio" id='question3' name="question" value={props.incorrect_answer2} required/>
        </label>
        <label htmlFor={'question4'}>
          {props.incorrect_answer3}
          <input className="radio radio-xs bg-white" type="radio" id='question4' name="question" value={props.incorrect_answer3} required/>
        </label>

      <div className="join grid grid-cols-2 py-5 px-20">
        <a href={`#slide${index - 1}`} className={`${index ? 'join-item btn btn-outline' : `join-item btn btn-outline text-gray-500 pointer-events-none`}`}>Previous page</a>
        <a href={`#slide${index + 1}`} className={`${index === total - 1 ? `join-item btn btn-outline text-gray-500 pointer-events-none` : 'join-item btn btn-outline'}`}>Next</a>
      </div>
    </div> 
  );
}
