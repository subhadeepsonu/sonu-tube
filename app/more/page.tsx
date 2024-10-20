
import Link from "next/link"

export default function MorePage() {
    return <div className="min-h-screen bg-gray-50 w-full flex justify-center items-start pt-16 dark:bg-zinc-950 md:pl-52  pb-20">
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 md:gird-cols-3 gap-5 w-full px-5">
            <Link href={"/more/bookmarks"}>
                <div className="h-16 w-full bg-white dark:bg-transparent border-2  dark:border-zinc-800 dark:border-2 cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                    Bookmarks
                </div>
            </Link>
            <Link href={"/more/watchlater"}>
                <div className="h-16 w-full bg-white dark:border-zinc-800 border-2  dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                    Watch Later
                </div>
            </Link>
            <Link href={"/liked"}>
                <div className="h-16 w-full bg-white dark:border-zinc-800 border-2  dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                    Liked Videos
                </div>
            </Link>
            <Link href={"/history"}>
                <div className="h-16 w-full bg-white dark:border-zinc-800 border-2  dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                    Watch History
                </div>
            </Link>
            <Link href={"/more/following"}>
                <div className="h-16 w-full bg-white dark:border-zinc-800 border-2  dark:border-2 dark:bg-transparent cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                    Following chaneels
                </div>
            </Link>
        </div>
        <div>

        </div>
    </div>
}