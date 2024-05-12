import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/Submit";
import Image from "next/image";

export default async function Profile({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return redirect("/");
    }
    // const { data } = await supabase
    // .from("roles")
    // .select();
  
    // if (data![0].role === 'student') {
    //   //console.log(data)
    //   return redirect("/");
    // }
    const updateProfile = async (formData: FormData) => {
      "use server";
    
      const first_name = formData.get("first_name") as string;
      const last_name = formData.get("last_name") as string;
      const supabase = createClient();
  
      const { error } = await supabase
      .from("profiles")
      .update({
        first_name: first_name,
        last_name: last_name
      })
      .match({
        uuid: user!.id
      })
      
      if (error) {
        return redirect("?message=Could not update profile");
      }
      return redirect("?message=Profile updated successfully");
    };
    return( 
      <div className="flex-1 w-full flex items-center justify-evenly animate-fade"> 
        <div className="flex bg-loginblue rounded-2xl p-10 justify-evenly gap-10">
          <Image className="bg-white rounded-full w-fit h-fit" src="/usericon.png" alt="User image" width={100} height={100}/>
          <div className="flex flex-col">
            <form className="flex flex-col gap-1 px-5">
              <p className="text-center font-bold text-2xl text-white">Update your profile</p>
              <label className="text-white" htmlFor="first_name">
                First name
              </label>
              <input 
              className=""
              name="first_name"
              placeholder="Linus"
              required
              />

              <label className="text-white" htmlFor="last_name">
                Last name
              </label>
              <input 
              className=""
              name="last_name"
              placeholder="Torvalds"
              required
              />

              <SubmitButton
              formAction={updateProfile}
              className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-2 py-2 text-foreground mt-2 text-black dark:text-black mx-[20%]"
              pendingText="Signing Up..."
              >
                Submit
              </SubmitButton>
              {searchParams?.message && (
                <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-green-300">
                  {searchParams.message}
                </p>
               )}
            </form>
          </div>
        </div>
      </div>
    )
}