import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
/* imports as required */

export default async function DashBoard({
  searchParams,
}: {
  searchParams: { w: number; d: number; user: string };
}) {
  const supabase = createClient();

  let data: any = false;
  if (searchParams.w && searchParams.d && searchParams.user) {
    data = await supabase
      .from("results")
      .select("*")
      .eq("week_number", searchParams.w)
      .eq("day_number", searchParams.d)
      .eq("user_uuid", searchParams.user);
    console.log(`data = ${data}`);
  }

  const progressBar1 = await supabase
    .from("results")
    .select("*")
    .eq("week_number", searchParams.w)
    .eq("day_number", searchParams.d)
    .eq("user_uuid", searchParams.user);
  console.log(`pb1 = ${progressBar1}`);

  return (
    <div className="flex flex-col  pt-10 px-10 w-full">
      <div className=" flex flex-row justify-between mb-5 ">
        <h1 className="font-black text-4xl pb-3 text-left ">
          Welcome to your dashboard
        </h1>
        <Link
          href="#"
          className="hover:bg-loginblue bg-lightblue text-black rounded-lg px-6 py-3 text-foreground hover:text-white font-semibold text-sm text-left h-9 flex items-center mt-1"
        >
          Modify quizzes
        </Link>
      </div>
      <form className="flex flex-row justify-start">
        <select className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4">
          <option>Select module</option>
          <option value="1">1. Onboarding</option>
          <option value="2">2. Front End</option>
          <option value="3">3. Software Engineer</option>
          <option value="4">4. Back End Engineer</option>
          <option value="5">5. Database Engineer</option>
          <option value="6">6. QA Engineer</option>
          <option value="7">7. Web Developer 1</option>
          <option value="8">8. Web Developer 2</option>
          <option value="9">9. Product</option>
          <option value="10">10. DevOps</option>
          <option value="11">11. Cyber Security</option>
          <option value="12">12. AI and Data</option>
        </select>
        <select className="select select-bordered w-1/6 max-w-xs bg-loginblue text-white mr-4 ">
          <option>Select day</option>
          <option value="1">Monday</option>
          <option value="2">Tuesday</option>
          <option value="3">Wednesday</option>
          <option value="4">Thursday</option>
          <option value="5">Friday</option>
        </select>
        <select className="select select-bordered w-1/4 max-w-xs bg-loginblue text-white mr-4 ">
          <option>Select name</option>
          {/* For all names, should be able to be added by the table called 'Profiles' 
          
          call the profiles table
          take first name and lastname
            map across all rows in the table
          make into an option tag
            insert first and last name separately
          
          <option link to uuid of individual bootcamper>
            {call first name} {call last name}
          </option>

          */}

          <option>Annamaria Koutsoras</option>
          <option>Jack White</option>
          <option>Stephen Boyce</option>
          <option value="9efbb99c-82f9-4251-9a78-2939cf3616b0">
            Igor Silva
          </option>
        </select>
        <button type="submit">Submit</button>
      </form>
      <div className="grid grid-rows-[10vh, 30vh, 10vh] ">
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center items-end h-24 mb-2 ">
          <p className="col-start-2 col-span-2 text-2xl font-bold	">
            Bootcamper
          </p>
          <p className="col-start-5 col-span-2 text-2xl font-bold	">Cohort</p>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center ">
          <div
            className=" mt-5 radial-progress text-loginblue col-start-2  "
            style={{
              "--value": { progressBar1 },
              /* call the correct row of the answers table for daily score */ "--size":
                "8rem",
            }}
            role="progressbar"
          >
            63%{" "}
            {/* call the correct row of the answers table for daily score */}
          </div>
          <div
            className=" mt-5 radial-progress text-black  col-start-3  "
            style={{
              "--value": 90,
              /* take the mean average - 5 calls, sum them, divide by number of quizzes that week */ "--size":
                "8rem",
            }}
            role="progressbar"
          >
            90%{" "}
            {/* take the mean average - 5 calls, sum them, divide by number of quizzes that week */}
          </div>

          {/* <div className="border-r-2 border-black col-start-4 h-40 justify-end"></div> */}

          <div
            className=" mt-5 radial-progress text-loginblue col-start-5 "
            style={{
              "--value": 78,
              /* take the cohort mean average for the day - sum all daily answers and divide by number of bootcampers who attempted it */ "--size":
                "8rem",
            }}
            role="progressbar"
          >
            78%{" "}
            {/* take the cohort mean average for the day - sum all daily answers and divide by number of bootcampers who attempted it */}
          </div>
          <div
            className=" mt-5 radial-progress text-black col-start-6 "
            style={{
              "--value": 70,
              /* take the cohort mean average for the week - sum all daily averages and divide by number of quizzes that week */ "--size":
                "8rem",
            }}
            role="progressbar"
          >
            70%{" "}
            {/* take the cohort mean average for the week - sum all daily averages and divide by number of quizzes that week */}
          </div>
        </div>
        <div className="grid grid-cols-subgrid col-span-7 justify-items-center text-lg mt-5 mb-10">
          <p className="col-start-2 ">Daily score</p>
          <p className="col-start-3">Weekly average</p>
          <p className="col-start-5">Daily average</p>
          <p className="col-start-6">Weekly average</p>
        </div>
      </div>
    </div>
  );
}
