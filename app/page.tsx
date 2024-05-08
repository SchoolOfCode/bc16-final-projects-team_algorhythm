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
    <div className="flex-1 w-full flex flex-col gap-20 items-center">
      <div className="animate-in flex-1 flex flex-col gap-20 opacity-0 max-w-4xl px-3">
         Content
      </div>     
    </div>
  )
}
