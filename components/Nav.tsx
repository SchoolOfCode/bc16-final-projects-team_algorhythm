import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import { redirect } from "next/navigation";
import Image from "next/image";

export default async function Nav() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const signOut = async () => {
    "use server";

    const supabase = createClient();
    await supabase.auth.signOut();
    return redirect("/login");
  };

  return user ? (
    <div className="navbar bg-sky-100 px-10 py-5">
      <div className="flex-1">
        <Link href="/">
          <Image src="/logoblack.png" alt="SoC Logo" width={250} height={200} />
        </Link>
      </div>
      <div className="">
        <Link className="px-3 dark:text-black" href="/">
          Home
        </Link>
        <Link className="px-3 dark:text-black" href="/dashboard">
          Dashboard
        </Link>
        <Link className="px-3 dark:text-black" href="/allQuizzes">
          Quizzes
        </Link>
        <Link
          className="px-5 dark:text-black"
          href="https://bot.schoolofcode.com/"
          target="_blank"
        >
          SoCBot
        </Link>
        <p className="pl-3 dark:text-black">Hey, {user.email}!</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
              />
            </div>
          </div>
          <form action={signOut}>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <button type="submit">Logout</button>
              </li>
            </ul>
          </form>
        </div>
      </div>
    </div>
  ) : null;
}