import AnnoucementCard from "@/components/cards/announcementCard"
import { GetBookmarkById } from "@/data/getbookmarkbyid"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export default async function Watchlater(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetBookmarkById(decoded.id)
    return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-900 bg-gray-100 items-center pt-20 md:pl-20 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
        {data.map((announcement)=>{
            return <AnnoucementCard  owerid={announcement.userid} key={announcement.id} id={announcement.annoucementid} discription={announcement.annoucement.discription} title={announcement.annoucement.title} userimg={announcement.annoucement.user.imgurl} likes={announcement.annoucement._count.annoucementlike} dislikes={announcement.annoucement._count.annoucementdislike} username={announcement.annoucement.user.name}  userdislike={announcement.user.annoucementdislike} userlike={announcement.user.annoucementlike} userbookmark={announcement.user.annoucementbookmark} >
            </AnnoucementCard>
        })}
        </div>
        </div>
}