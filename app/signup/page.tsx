import { headers } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/Sign-Up-In";
import Image from "next/image";
import Link from "next/link";

export default async function SignUp({
  searchParams,
}: {
  searchParams: { message: string };
}) {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    return redirect("/");
  }

  const signUp = async (formData: FormData) => {
    "use server";

    const origin = headers().get("origin");

    const first_name = formData.get("first_name") as string;
    const last_name = formData.get("last_name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });

    if (error) {
      if (error!.code === "weak_password") {
        return redirect(
          "/signup?message=Password should be at least 6 characters",
        );
      }
      return redirect("/signup?message=Could not authenticate user");
    }

    // Inserting role to Roles table
    const { error: rolesError } = await supabase
    .from("roles")
    .insert([{ 
      uuid: data.user!.id, 
      role: 'student'
    }])
    if (rolesError) {
      console.error("Error inserting data to table roles:", rolesError);
    }
    // Ends

    // Inserting data to Profiles table
    const { error: profileError } = await supabase
    .from("profiles")
    .insert([{ 
      uuid: data.user!.id, 
      first_name, 
      last_name, 
      email 
    }])
    if (profileError) {
      console.error("Error inserting data to table profiles:", profileError);
    }
    // Ends

    return redirect("/signup?message=Check email to continue sign in process");
  };

  return (
    <div className="flex-1 flex w-full justify-center">
      <div className="bg-socskyblue flex-1 flex flex-col w-full px-8 justify-center items-center">
        <Image
          className="pb-10 animate-fade-right"
          src="/soclarge.png"
          alt="SoC Logo"
          width={600}
          height={600}
        />
      </div>
      <div className="flex-1 flex w-full px-8 justify-center gap-2 items-center">
        <form className="animate-fade-left flex w-[50%] flex-col justify-center gap-2 text-foreground bg-loginblue p-10 rounded-2xl">
          <div
            className="tooltip tooltip-left "
            data-tip="Return to login"
          ></div>
          <label className="text-md text-white" htmlFor="first_name">
            First name
          </label>
          <input
            className="bg-white rounded-2xl px-4 py-2 bg-inherit border mb-6  dark:text-black"
            name="first_name"
            placeholder="Linus"
            type="text"
            minLength={3}
            maxLength={25}
            required
          />
          <label className="text-md text-white" htmlFor="last_name">
            Last name
          </label>
          <input
            className="bg-white rounded-2xl px-4 py-2 bg-inherit border mb-6  dark:text-black"
            name="last_name"
            placeholder="Torvalds"
            type="text"
            minLength={3}
            maxLength={25}
            required
          />
          <label className="text-md text-white" htmlFor="email">
            Email
          </label>
          <input
            className="bg-white rounded-2xl px-4 py-2 bg-inherit border mb-6  dark:text-black"
            name="email"
            placeholder="email@example.com"
            required
          />
          <label className="text-md text-white" htmlFor="password">
            Password
          </label>
          <input
            className="bg-white rounded-2xl px-4 py-2 bg-inherit border mb-6  dark:text-black"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signUp}
            className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-4 py-2 text-foreground mb-2 text-black dark:text-black mx-[15%]"
            pendingText="Signing Up..."
          >
            Submit
          </SubmitButton>
          <Link
            href="/login"
            className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-4 py-2 text-foreground mb-2 text-center text-black dark:text-black mx-[15%]"
          >
            Return to login
          </Link>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center rounded-2xl text-pink-300">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
