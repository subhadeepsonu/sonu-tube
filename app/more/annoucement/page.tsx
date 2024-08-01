import EmptyCard from "@/components/cards/empty"
import { Button } from "@/components/ui/button"
import { GetAnnouncementById } from "@/data/getannouncementbyid"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
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
  
export default async function Watchlater(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetAnnouncementById(decoded.id)
    if(data?.annoucement.length==0){
        return <div className="min-h-screen w-full realtive flex flex-col justify-center bg-gray-100 items-center pt-20 md:pl-20">
                    <EmptyCard></EmptyCard>

                    <Sheet>
                        <SheetTrigger>
                    <Button className="absolute bottom-2 right-2">Add Announcement</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle >Add Announcement</SheetTitle>
                            <SheetDescription>
                                <AddAnnouncementForm></AddAnnouncementForm>
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
        </div>
    }
    return <div className="min-h-screen w-full flex flex-col justify-start bg-gray-100 items-center pt-20 md:pl-20">
        {JSON.stringify(data?.annoucement)}
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
        </div>
}