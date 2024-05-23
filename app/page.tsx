import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";

export default async function Index() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return redirect("/login");
  }

  return (
    <div className="flex-1 w-full flex  items-center justify-evenly md:flex-col">
      <div className="animate-fade-right">
        <p className="text-loginblue text-xl font-semibold md:mt-10">
          Test your knowledge
        </p>
        <h1 className="font-black text-6xl pt-5 md:text-3xl md:">Welcome to</h1>
        <h1 className="font-black text-6xl pb-10 pt-2">SoCBrain</h1>
        <Link
          href="/modules"
          className="bg-loginblue hover:bg-sky-300 hover:text-black rounded-lg px-6 py-5 ml-1 text-foreground text-white font-semibold text-lg shadow-md"
        >
          Explore quizzes
        </Link>
      </div>
      <div className="animate-fade-left md:w-[50%] md:invisible">
        <Image
          src="/homeImg.png"
          alt="Home image"
          width={700}
          height={700}
        ></Image>
      </div>
    </div>
  );
}
