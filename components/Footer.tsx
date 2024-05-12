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
      <Link href="/">
        <p>
          Powered by
          <Image src="/algologo.png" alt="SoC Logo" width={200} height={200} />
        </p>
      </Link>
    </footer>
  ) : null;
}
