import { Button } from "@/components/ui/button"
import Link from "next/link"
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
  } from "@/components/ui/sheet"
import AddAnnouncementForm from "@/components/forms/addanouncementform"
export default function MorePage(){
    return <div className="min-h-screen w-full flex justify-center items-start pt-20 md:pl-20 bg-gray-100">
        <Link href={"/more/uploadvideo"}>
        <Button className="fixed bottom-16 right-5">Upload Video</Button>
        </Link>
        
        <Sheet>
                        <SheetTrigger>
                    <Button className="absolute bottom-2 right-2">Add Announcement</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle >Add Announcement</SheetTitle>
                            <SheetContent>
                                <AddAnnouncementForm></AddAnnouncementForm>
                            </SheetContent>
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
        <div className="grid lg:grid-cols-3 xl:grid-cols-4 sm:grid-cols-2 md:gird-cols-3 gap-5">
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
            <Link href={"/more/video"}>
            <div className="h-16 w-64 bg-white cursor-pointer flex justify-center items-center rounded-lg shadow-sm ">
                Following chaneels
            </div>
            </Link>
        </div>
            <div>

            </div>
    </div>      
}