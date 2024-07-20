import AnnoucementCard from "@/components/cards/announcementCard"
import { GetAllAnnouncements } from "@/data/getallannouncement"
export default async  function AnnouncementPage(){
    const data = await GetAllAnnouncements()
    return <div className="min-h-screen w-full flex flex-col justify-start items-center pt-20 pl-20 pb-5 bg-gray-50">
            <p className="p-2 text-3xl font-semibold">Announcements</p>
            <div className="grid grid-cols-3 gap-5">
                {data.map((announcement,index)=>{
                    return <AnnoucementCard userbookmark={announcement.annoucementbookmark} userlike={announcement.annoucementlike} userdislike={announcement.annoucementdislike} likes={announcement._count.annoucementlike} dislikes={announcement._count.annoucementdislike} discription={announcement.discription} title={announcement.title} username={announcement.user.name} userimg={announcement.user.imgurl}  key={index} id={announcement.id}></AnnoucementCard>
                })}
            </div>
    </div>      
}