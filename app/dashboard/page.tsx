
import Link from "next/link";

export default function DashBoard() {
    return (
        <div className="flex flex-col justify-start items-start pt-10 px-10 w-full">
          <div className=" flex flex-row ">
            <h1 className="font-black text-4xl pb-5 text-left ">Welcome to your dashboard</h1>
            <Link
              href="#"
              className="hover:bg-loginblue bg-sky-300 text-black rounded-lg px-6 py-3 text-foreground hover:text-white font-semibold text-lg text-left "
            >
              Modify quizzes
            </Link>
            </div>
            <div>
            <select className="select select-bordered w-full max-w-xs bg-loginblue text-white " >
  <option disabled selected>Select module</option>
  <option>1. Onboarding</option>
  <option>2. Front End</option>
</select>
<select className="select select-bordered w-full max-w-xs bg-loginblue text-white " >
  <option disabled selected>Select day</option>
  <option>Monday</option>
  <option>Tuesday</option>
  <option>Wednesday</option>
  <option>Thursday</option>
  <option>Friday</option>
</select>
<select className="select select-bordered w-full max-w-xs bg-loginblue text-white " >
  <option disabled selected>Select name</option>
  <option>Annamaria Koutsoras</option>
  <option>Jack White</option>
  <option>Stephen Boyce</option>
</select>
<p>Bootcamper</p>
<p>Cohort</p>

</div>

            <div className=" mt-5 radial-progress text-loginblue " style={{"--value":70}} role="progressbar">70%</div>
            <div className=" mt-5 radial-progress text-black " style={{"--value":70}} role="progressbar">70%</div>
            <div className=" mt-5 radial-progress text-loginblue " style={{"--value":70}} role="progressbar">70%</div>
            <div className=" mt-5 radial-progress text-black " style={{"--value":70}} role="progressbar">70%</div>
            <div>
            <p>Daily score</p>
            <p>Weekly average</p>
            <p>Daily average</p>
            <p>Weekly average</p>
        </div>
        </div>
       
    );
}

