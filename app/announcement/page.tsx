import AnnoucementCard from "@/components/cards/announcementCard"
import { GetAllAnnouncements } from "@/data/getallannouncement"
export default async  function AnnouncementPage(){
    const data = await GetAllAnnouncements()
    return <div className="min-h-screen w-full dark:bg-zinc-950 flex flex-col md:justify-start justify-center items-center mb-20 pt-20 md:pl-20  bg-white pb-20">
            <p className="p-2 text-3xl font-semibold">Announcements</p>
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5">
                {data.map((announcement,index)=>{
                    return <AnnoucementCard owerid={announcement.userid} userbookmark={announcement.annoucementbookmark} userlike={announcement.annoucementlike} userdislike={announcement.annoucementdislike} likes={announcement._count.annoucementlike} dislikes={announcement._count.annoucementdislike} discription={announcement.discription} title={announcement.title} username={announcement.user.name} userimg={announcement.user.imgurl}  key={index} id={announcement.id}></AnnoucementCard>
                })}
            </div>
    </div>      
}