import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

export default function Profile() {
    const supabase = createClient();
    const userData = async () => {
        try {
          const { data, error } = await supabase
            .from("roles")
            .select("uuid, role");
          if (data![0].role === 'student') {
            return redirect("/")
            //console.log(data)
          }
        } catch (error) {
            console.log(error);
        }
    };
    userData()
    return( 
        <>
        <h1>Profile</h1>
       
        </>
    )
}