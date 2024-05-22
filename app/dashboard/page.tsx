import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";

import StudentDashBoard from "./student/StudentDashBoard";
import AdminDashBoard from "./admin/AdminDashBoard";
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
  const role = await supabase.from("roles").select("*");

  const admin = role.data![0].role === "admin";
  // Check ends, now it applies to JSX to render based on role

  const data = await supabase.from("results").select("*");
  //console.log(progressBar1.data);

  // Gets user name (applied only on student dashboard)
  const userData = await supabase.from("profiles").select("*");

  // Storing img url here if it exists
  let img;
  // Check if user has image
  const searchImg = await supabase.storage
    .from("avatars")
    .list(user!.id + "/", {
      limit: 1,
      offset: 0,
    });
  if (searchImg?.data!.length) {
    // Fetch user image
    const image = supabase.storage
      .from("avatars")
      .getPublicUrl(user!.id + "/avatar.png");
    img = image.data.publicUrl;
  }

  return admin ? (
    <AdminDashBoard data={data} userData={userData} img={img} />
  ) : (
    <StudentDashBoard data={data} userData={userData} img={img} />
  );
}
