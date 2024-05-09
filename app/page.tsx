import { createClient } from "@/utils/supabase/server";
import Nav from "@/components/Nav";
import { redirect } from "next/navigation";
import Footer from "@/components/Footer";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();


  if (!user) {
    return redirect("/login");
  }
  

  return (
    <div className="flex-1 w-full flex gap-20 items-center">
      Content   
    </div>
  )
}
