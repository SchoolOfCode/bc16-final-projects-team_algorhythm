import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AdminDashBoard from "@/components/AdminDashBoard";
/* imports as required */


export default async function DashBoard() {
  const supabase = createClient();

  const data = await supabase
    .from("results")
    .select("*")
  //console.log(progressBar1.data);


  return (
    <div className="flex flex-col  pt-10 px-10 w-full">
      <div className=" flex flex-row justify-between mb-5 ">
        <h1 className="font-black text-4xl pb-3 text-left ">
          Welcome to your dashboard
        </h1>
        <Link
          href="/quizcreation"
          className="hover:bg-loginblue bg-lightblue text-black rounded-lg px-6 py-3 text-foreground hover:text-white font-semibold text-sm text-left h-9 flex items-center mt-1"
        >
          Modify quizzes
        </Link>
      </div>
      <AdminDashBoard data={data}/>
    </div>
  );
}
