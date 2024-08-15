import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MorePage(){
    return <div className="min-h-screen w-full flex justify-center items-start pt-20 dark:bg-zinc-950 md:pl-20 bg-white pb-20">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 md:gird-cols-3 gap-5">
            <Link href={"/more/bookmarks"}>
            <div className="h-16 w-64 bg-white dark:bg-transparent border-2 border-gray-100 dark:border-zinc-800 dark:border-2 cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Bookmarks
            </div>
            </Link>
            <Link href={"/more/watchlater"}>
            <div className="h-16 w-64 bg-white dark:border-zinc-800 border-2 border-gray-100 dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Watch Later
            </div>
            </Link>
            <Link href={"/liked"}>
            <div className="h-16 w-64 bg-white dark:border-zinc-800 border-2 border-gray-100 dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Liked Videos
            </div>
            </Link>
            <Link href={"/history"}>
            <div className="h-16 w-64 bg-white dark:border-zinc-800 border-2 border-gray-100 dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Watch History
            </div>
            </Link>
            <Link href={"/more/following"}>
            <div className="h-16 w-64 bg-white dark:border-zinc-800 border-2 border-gray-100 dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Following chaneels
            </div>
            </Link>
        </div>
            <div>

            </div>
    </div>      
}