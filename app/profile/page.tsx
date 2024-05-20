import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/Submit";
import {uploadImage, updateProf} from "./update";

export default async function Profile({
  searchParams,
}: {
  searchParams: { message: string; img: string, imgMessage: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  // Check if there`s any image inside user storage
  const { data, error } = await supabase.storage.from('avatars').list(user.id + '/', {
    limit: 1,
    offset: 0,
  });
  if(data?.length){
    // Fetch user image
  const { data } = supabase
    .storage
    .from('avatars')
    .getPublicUrl(user.id + '/avatar.png')
    searchParams.img = data.publicUrl
  }

  // Functions to update first and last name
  const updateProfile = async (formData: FormData) => {
    "use server";
    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const data: any = {
      first_name,
      last_name
    }
    const update = await updateProf(data)
    if (update) {
      return redirect("?message=Profile updated successfully!");
    }
      return redirect("?message=Could not update profile");
  }
  
  // function to update user image
  const handleImage = async(formData: FormData)=>{
    'use server'
    const image = formData.get("file") as File;
    const update = await uploadImage(image)
    
    if(update){
      return redirect("?imgMessage=Image uploaded successfully!");
    }
    return redirect("?imgMessage=Could not upload image");
  }

  return (
    <div className="flex-1 w-full flex items-center justify-evenly animate-fade">
      <div className="flex bg-loginblue rounded-2xl p-10 justify-evenly gap-10">
        <form className="space-y-4 text-center">
          <label htmlFor="file-upload" className="flex flex-col items-center cursor-pointer">
            <img 
            className="bg-white rounded-full w-24 h-24" 
            alt="User image"
            width={100}
            height={100}
            src={searchParams?.img ? searchParams.img : '/usericon.png'} 
            />
            <input type="file" id="file-upload" className="file-input bg-socskyblue file-input-bordered file-input-xs w-full max-w-xs mt-5" required/>
          </label>
          <SubmitButton
              formAction={handleImage}
              className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-5 py-2 text-foreground text-black dark:text-black "
              pendingText="Saving..."
            >
              Save
            </SubmitButton>
            {searchParams?.imgMessage && (
              <p className="mt-4 p-4 bg-foreground/30 text-foreground text-center rounded-2xl text-green-200">
                {searchParams.imgMessage}
              </p>
            )}
        </form>
        <div className="flex flex-col">
          <form className="flex flex-col gap-1 px-5">
            <p className="text-center font-bold text-2xl text-white">
              Update your profile
            </p>
            <label className="text-white" htmlFor="first_name">
              First name
            </label>
            <input
              className="rounded-md"
              name="first_name"
              placeholder="Linus"
              required
            />

            <label className="text-white" htmlFor="last_name">
              Last name
            </label>
            <input
              className="rounded-md"
              name="last_name"
              placeholder="Torvalds"
              required
            />

            <SubmitButton
              formAction={updateProfile}
              className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-2 py-2 text-foreground mt-2 text-black dark:text-black mx-[20%]"
              pendingText="Submitting..."
            >
              Submit
            </SubmitButton>
            {searchParams?.message && (
              <p className="mt-4 p-4 bg-foreground/30 text-foreground text-center rounded-2xl text-green-200">
                {searchParams.message}
              </p>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}
