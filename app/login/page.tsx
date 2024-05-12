import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import { SubmitButton } from "@/components/Submit";
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
          <label className="text-md text-white" htmlFor="email">
            Email
          </label>
          <input
            className="bg-white rounded-2xl px-4 py-2 bg-inherit border mb-6 dark:text-black"
            name="email"
            placeholder="you@example.com"
            required
          />
          <label className="text-md text-white" htmlFor="password">
            Password
          </label>
          <input
            className="bg-white rounded-2xl px-4 py-2 bg-inherit border mb-6 dark:text-black"
            type="password"
            name="password"
            placeholder="••••••••"
            required
          />
          <SubmitButton
            formAction={signIn}
            className="bg-socskyblue hover:bg-sky-300 hover:text-white rounded-2xl px-4 py-2 text-foreground mb-2 text-black dark:text-black mx-[15%]"
            pendingText="Signing In..."
          >
            Login
          </SubmitButton>
          <Link href="/" className="hover:text-black text-center text-white">Forgot Password?</Link>
          <p className="text-center text-white">Need an account? <Link href="/signup" className="font-bold underline hover:text-black">Signup</Link></p>
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
