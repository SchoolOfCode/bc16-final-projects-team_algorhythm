import { createClient } from "@/utils/supabase/server";
import Link from "next/link";

export default async function Footer(){
    const supabase = createClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    return user ? (
        <footer className="w-full border-t border-t-foreground/10 p-8 flex justify-center text-center text-xs">
            <Link href='/'>
                <p>
                    Powered by{" "}
                    <b>Algorhythm</b>
                </p>
            </Link>
        </footer>
    ) : null
}
