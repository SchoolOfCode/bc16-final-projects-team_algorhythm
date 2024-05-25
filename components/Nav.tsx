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

  const getImage = async () => {
    let image;
    // Check if there`s any image inside user storage
    const { data, error } = await supabase.storage
      .from("avatars")
      .list(user!.id + "/", {
        limit: 1,
        offset: 0,
      });
    if (data?.length) {
      // Fetch user image
      const img = supabase.storage
        .from("avatars")
        .getPublicUrl(user!.id + "/avatar.png");
      image = img.data.publicUrl;
    }

    return (
      <img
        className="w-16 h-16 b"
        src={image ? image : "/usericon.png"}
        alt="User Icon"
        width={55}
        height={55}
      />
    );
  };

  return user ? (
    <div className="navbar bg-socskyblue px-10 md:px-2 animate-fade-down z-50 sticky top-0 shadow-md">
      <div className="flex-1 m-3">
        <Link href="/">
          <Image src="/logoblack.png" alt="SoC Logo" width={150} height={150} />
        </Link>
      </div>
      <div className="">
        <Link className="px-3 dark:text-black" href="/">
          Home
        </Link>
        <Link className="px-3 dark:text-black" href="/modules">
          Modules
        </Link>
        <Link className="px-3 dark:text-black" href="/dashboard">
          Dashboard
        </Link>
        <p className="md:hidden pl-10 pr-10 dark:text-black">{userData()}!</p>
        <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-14 md:w-9 md:ml-3 rounded-full">{getImage()}</div>
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
