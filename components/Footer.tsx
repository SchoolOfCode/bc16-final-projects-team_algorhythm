import { createClient } from "@/utils/supabase/server";
import Link from "next/link";
import Image from "next/image";


export default async function Footer() {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user ? (
  <footer className="footer p-6 bg-base-300 text-base-content text-xs">
      <nav>
        <h6 className="footer-title">Help and Support</h6> 
        <a href="https://learn.schoolofcode.co.uk/" target="_blank" rel="noopener noreferrer" className="link link-hover">LearnWorlds</a>     
        <a href= "https://www.notion.so/algorhythmdocs/SoCBrain-Docs-1c9124260da64589ad52303490438d79" target="_blank" rel="noopener noreferrer" className="link link-hover">Documentation</a>
        <a href= "https://www.notion.so/algorhythmdocs/FAQs-f7b1dd5a3c564adf86e7991d84521eb1" target="_blank" rel="noopener noreferrer" className="link link-hover">FAQs</a>
        <a href="mailto:info@schoolofcode.co.uk"className="link link-hover">Contact us</a>     
      </nav> 
       <nav>
        <h6 className="footer-title">Knowledge Base</h6> 
        <a href="https://www.codewars.com/" target="_blank" rel="noopener noreferrer" className="link link-hover">CodeWars</a>
        <a href="https://jsfiddle.net/" target="_blank" rel="noopener noreferrer" className="link link-hover">JSFiddle</a>
        <a href="https://exercism.org/"target="_blank" rel="noopener noreferrer" className="link link-hover">Exercism</a>
        <a href="https://freecodecamp.org/" target="_blank" rel="noopener noreferrer" className="link link-hover">Free Code Camp</a>
      </nav> 
      

      <div className="w-full mt-4 flex flex-col items-center">
        <Image className="hidden dark:block" src="/algologolight.png" alt="SoC Logo" width={100} height={100} />
        <Image className="dark:hidden" src="/algologo.png" alt="SoC Logo" width={100} height={100} />
        <p className="mt-4 text-center">
          © Copyright 2024 School of Code. All Rights Reserved. School of Code Ltd is registered in England, Company No. 09793790. School of Code, Custard Factory, Gibb Street, Birmingham, B9 4AA
        </p>
      </div>
      <nav>
        <h6 className="footer-title">Company</h6> 
        <a href="https://www.schoolofcode.co.uk/" target="_blank" rel="noopener noreferrer" className="link link-hover">About us</a>
        <a href="https://learn.schoolofcode.co.uk/" target="_blank" rel="noopener noreferrer" className="link link-hover">Terms of Use</a>
        <a href="https://www.schoolofcode.co.uk/privacy/" target="_blank" rel="noopener noreferrer" className="link link-hover">Privacy and Cookie Policy</a>
        <a href="https://www.schoolofcode.co.uk/carbon-reduction-plan/" target="_blank" rel="noopener noreferrer" className="link link-hover">Carbon Reduction Plan</a>
      
         
      </nav> 
      <nav>
      <h6 className="footer-title">Social</h6>
      <div className="grid grid-flow-col gap-4">
      <a href="https://twitter.com/theSchoolOfCode/" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 48 48" className="fill-current">
              <path d="M24 2C11.85 2 2 11.85 2 24s9.85 22 22 22 22-9.85 22-22S36.15 2 24 2zm9.81 30.83L24 23.2l-9.81 9.63L12 30.58l9.63-9.81L12 11l2.18-2.18 9.82 9.63 9.82-9.63L36 11l-9.63 9.77L36 30.58z"/>
          </svg>
      </a>
        <a href="https://www.youtube.com/channel/UCKBzheEKcrqsaJhMV0f_Dmg" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current">
            <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
          </svg>
        </a>
      <a href="https://www.facebook.com/schoolofcode/" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current">
            <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
          </svg>
        </a>
      <a href="https://www.linkedin.com/school/school-of-code/" target="_blank" rel="noopener noreferrer">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" className="fill-current">
            <path d="M19 0h-14c-2.75 0-5 2.25-5 5v14c0 2.75 2.25 5 5 5h14c2.75 0 5-2.25 5-5v-14c0-2.75-2.25-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.14c-.97 0-1.75-.78-1.75-1.75s.78-1.75 1.75-1.75 1.75.78 1.75 1.75-.78 1.75-1.75 1.75zm13.5 11.14h-3v-5.5c0-1.34-.04-3.06-1.87-3.06-1.87 0-2.16 1.46-2.16 2.97v5.59h-3v-10h2.88v1.36h.04c.4-.76 1.36-1.56 2.79-1.56 2.99 0 3.54 1.97 3.54 4.52v5.68z"></path>
          </svg>
        </a>
      </div>
      </nav>

    </footer>
  ) : null;
}
