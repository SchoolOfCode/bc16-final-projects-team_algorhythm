
import Link from "next/link";

export default function DashBoard() {
    return (
        <div className="flex flex-col justify-start items-start pt-10 px-10 w-full">
            <h1 className="font-black text-5xl pb-5 text-left">Admin Dashboard</h1>
            <Link
              href="#"
              className="bg-loginblue hover:bg-sky-300 hover:text-black rounded-lg px-6 py-3 text-foreground text-white font-semibold text-lg text-left"
            >
              Edit quizzes
            </Link>
            <div className=" mt-5 radial-progress text-loginblue " style={{"--value":70}} role="progressbar">70%</div>

        </div>
    );
}
