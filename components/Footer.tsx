import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";


export default async function Footer() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
  <footer className="w-full border-t border-t-foreground/10 p-8 flex flex-col items-center text-center text-xs">
    <div className="flex justify-between w-full mb-4">
      <a href="https://www.schoolofcode.co.uk/about/" className="mx-2">Terms of Use</a>
      <a href="https://www.schoolofcode.co.uk/privacy/" className="mx-2">Privacy Policy</a>
      <a href="https://www.schoolofcode.co.uk/carbon-reduction-plan/" className="mx-2">Carbon Reduction Plan</a>
    </div>
    <div className="flex items-center justify-center">
      <p className="mr-4">
        © Copyright 2024 School of Code. All Rights Reserved.
        <br />
        School of Code Ltd is registered in England, Company No. 09793790
        <br />
        School of Code, Custard Factory, Gibb Street, Birmingham, B9 4AA
      </p>
      <div>
        <Image src="/algologo.png" alt="SoC Logo" width={200} height={200} />
        <Image src="/algologo.png" alt="SoC Logo" width={200} height={200} />
      </div>
    </div>
  </footer>
) : null;
}