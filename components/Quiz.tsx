
export default function Quiz({ props, index }: any) {
  
  return (
    <div id={`slide${index}`} className="carousel-item relative w-full">
      <img src="https://img.daisyui.com/images/stock/photo-1625726411847-8cbb60cc71e6.jpg" className="w-full" />
      {props.question}
      <div className="absolute flex justify-between transform -translate-y-1/2 left-5 right-5 bottom-0">
          <a href={`#slide${index - 1}`} className="btn btn-circle">❮</a>
          <a href={`#slide${index + 1}`} className="btn btn-circle">❯</a>
      </div>
    </div> 
  );
}
