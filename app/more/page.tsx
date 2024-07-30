import Link from "next/link"

export default function MorePage(){
    return <div className="min-h-screen w-full flex justify-center items-start pt-20 pl-20 bg-gray-100">
        <div className="grid grid-cols-4 gap-5">
            <Link href={"/more/bookmarks"}>
            <div className="h-16 w-64 bg-white cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Bookmarks
            </div>
            </Link>
            <Link href={"/more/watchlater"}>
            <div className="h-16 w-64 bg-white cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Watch Later
            </div>
            </Link>
            <Link href={"/more/annoucement"}>
            <div className="h-16 w-64 bg-white cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Your Announcements 
            </div>
            </Link>
            <Link href={"/more/video"}>
            <div className="h-16 w-64 bg-white cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Your Videos
            </div>
            </Link>
        </div>
            <div>

            </div>
    </div>      
}