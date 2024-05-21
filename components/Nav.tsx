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

  const userData = async () => {
    try {
      const { data, error } = await supabase
        .from("profiles")
        .select("uuid, first_name, last_name, email");
      if (data) {
        return `Hey, ${data[0].first_name}`;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return user ? (
    <div className="navbar bg-socskyblue px-10 animate-fade-down z-50 sticky top-0 shadow-md">
      <div className="flex-1 m-3">
        <Link href="/">
          <Image src="/logoblack.png" alt="SoC Logo" width={150} height={150} />
        </Link>
      </div>
      <div className="">
        <Link className="px-3 dark:text-black" href="/">
          Home
        </Link>
        <Link className="px-3 dark:text-black" href="/dashboard">
          Dashboard
        </Link>
        <Link className="px-3 dark:text-black" href="/modules">
          Modules
        </Link>
        <p className="pl-10 pr-10 dark:text-black">{userData()}!</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <Image
                src="/usericon.png"
                alt="User Icon"
                width={50}
                height={50}
              />
            </div>
          </div>
          <form action={signOut}>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
            >
              <li>
                <Link className="justify-between" href="/profile">
                  Profile
                  <span className="badge">New</span>
                </Link>
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
