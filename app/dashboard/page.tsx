import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import AdminDashBoard from "@/components/AdminDashBoard";
import { redirect } from "next/navigation";
import StudentDashBoard from "./student/StudentDashBoard";
/* imports as required */


export default async function DashBoard() {
  const supabase = createClient();
  //Checking if the user is loged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }
  // Check ends

  //Checking if the user is Coach or Student
  const role = await supabase
    .from('roles')
    .select("*")

  const admin = role.data![0].role === 'admin'
  // Check ends, now it applies to JSX to render based on role

  const data = await supabase
    .from("results")
    .select("*")
  //console.log(progressBar1.data);

  // Gets user name (applied only on student dashboard)
  const userData = await supabase
    .from("profiles")
    .select('*')

  // Get user todo list
  const todoData = await supabase
    .from('todo')
    .select('*')
    .eq('user_uuid', user.id)
  

  return (
    admin ? (
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
    ) : (
        <StudentDashBoard data={data} userData={userData} todoData={todoData}/>
    )
  );
}
