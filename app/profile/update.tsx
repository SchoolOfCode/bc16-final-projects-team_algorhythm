
import { createClient } from "@/utils/supabase/server";

export async function uploadImage(image:File){
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();
    
    // Inserting image to user bucket
    const {data,error} = await supabase
      .storage
      .from('avatars')
      .upload(user!.id + '/' + 'avatar.png', image,{
        cacheControl: '3600',
        upsert: true
      })

    if(error){
      console.log(error)
      return false
    }
    return true
}

export async function updateProf( data :any){
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { error } = await supabase
      .from("profiles")
      .update({
        first_name: data.first_name,
        last_name: data.last_name,
      })
      .match({
        uuid: user!.id,
      });

    if (error) {
       console.log(error)
       return false
    }
    return true
}