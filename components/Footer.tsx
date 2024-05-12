import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";

export default async function Footer() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
    <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
      <p>
        Powered by
        <Image
          className="block dark:hidden"
          src="/algologo.png"
          alt="SoC Logo"
          width={150}
          height={150}
        />
        <Image
          className="hidden dark:block"
          src="/algologolight.png"
          alt="SoC Logo"
          width={150}
          height={150}
        />
      </p>
    </footer>
  ) : null;
}
