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

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: `${origin}/auth/callback`,
      },
    });
    console.log(error!.code);
    if (error) {
      if (error!.code === "weak_password") {
        return redirect(
          "/signup?message=Password should be at least 6 characters",
        );
      }
      return redirect("/signup?message=Could not authenticate user");
    }

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
      <div className="flex-1 flex w-full px-8 justify-center gap-2">
        <form className="animate-fade-left flex w-[50%] flex-col justify-center gap-2 text-foreground">
          <div className="tooltip tooltip-left " data-tip="Go Back">
            <Link
              href="/login"
              className="rounded-md py-2 text-foreground mb-2 text-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                className="w-6 h-6"
              >
                {" "}
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M9 15 3 9m0 0 6-6M3 9h12a6 6 0 0 1 0 12h-3"
                />
              </svg>
            </Link>
          </div>
          <label className="text-md" htmlFor="first_name">
            First Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder-sky-800"
            name="first_name"
            placeholder="Linus"
            type="text"
            required
          />
          <label className="text-md" htmlFor="last_name">
            Last Name
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder-sky-800"
            name="last_name"
            placeholder="Torvalds"
            type="text"
            required
          />
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder-sky-800"
            name="email"
            placeholder="email@example.com"
            required
          />
          <label className="text-md" htmlFor="password">
            Password
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder-sky-800"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signUp}
            className="bg-socskyblue hover:bg-sky-200 rounded-md px-4 py-2 text-foreground mb-2 text-black"
            pendingText="Signing Up..."
          >
            Sign Up
          </SubmitButton>
          {searchParams?.message && (
            <p className="mt-4 p-4 bg-foreground/10 text-foreground text-center">
              {searchParams.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}
