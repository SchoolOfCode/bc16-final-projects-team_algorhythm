import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Footer() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <footer className="animate-fade-up w-full border-t border-t-foreground/10 p-8 flex flex-row justify-center text-center text-xs">
      <p>
        Powered by
        <Image
          className="dark:hidden inline-block"
          src="/algologo.png"
          alt="SoC Logo"
          width={100}
          height={100}
        />
        <Image
          className="hidden dark:inline-block"
          src="/algologolight.png"
          alt="SoC Logo"
          width={100}
          height={100}
        />
      </p>
    </footer>
  ) : null;
}
