import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/Sign-Up-In";
import Link from "next/link";
import Image from "next/image";

export default async function Login({
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

  const signIn = async (formData: FormData) => {
    "use server";

    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const supabase = createClient();

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      return redirect("/login?message=Could not authenticate user");
    }

    return redirect("/");
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
        <form className="animate-fade-left flex w-[50%] flex-col justify-center gap-2 text-foreground  bg-loginblue p-10 rounded-2xl">
          <label className="text-md" htmlFor="email">
            Email
          </label>
          <input
            className="rounded-md px-4 py-2 bg-inherit border mb-6 placeholder-sky-800"
            name="email"
            placeholder="you@example.com"
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
            formAction={signIn}
            className="bg-socskyblue hover:bg-sky-200 rounded-md px-4 py-2 text-foreground mb-2 text-black"
            pendingText="Signing In..."
          >
            Sign In
          </SubmitButton>
          <Link
            href="/signup"
            className="bg-socskyblue hover:bg-sky-200 rounded-md px-4 py-2 text-foreground mb-2 text-center text-black"
          >
            Sign Up Here!
          </Link>
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
