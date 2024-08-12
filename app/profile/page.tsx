import {ProfileById} from "@/actions/user/profile"
import AnnoucementCard from "@/components/cards/announcementCard"
import OwnerVideoCard from "@/components/cards/ownervideocard"
import VideoCard from "@/components/cards/videocard"
import FollowerHandler from "@/components/handlers/followerhandler"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function UerProfile(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await  ProfileById(decoded.id)
    return <div className="min-h-screen flex flex-col bg-gray-50 justify-start md:pl-24 pt-16 items-center pb-10  ">
        <div className=" p-3 rounded-lg h-40 w-full ">
            <img src="https://th.bing.com/th/id/OIG2.6bChLwKDF7ARn0f8J2PE?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Bgurl"  className="h-full rounded-lg w-full object-cover " />
        </div>
        <div className="h-52 px-5  flex justify-start w-full items-center">
            
            <img src={data?.imgurl} className="md:h-44 md:w-44 w-36 h-36 rounded-full object-cover"></img>
            
            <div className="pl-5 flex flex-col  justify-center items-start ">
                <p className="font-bold  text-2xl md:text-5xl py-2">{data?.name}</p>
                <p className="font-semibold">
                    {data?._count.follows} Followers</p>
                <p className="text-sm">
                    {data?._count.annoucement} Announcements
                </p>
                <p className="text-sm pb-2">
                    {data?._count.video} Videos
                </p>
                <FollowerHandler channelid={data?.id!} userid={decoded.id} follower={data?.follows}  name={data?.name!} ></FollowerHandler>
                </div>
            
            
        </div>
        <div className="w-11/12 py-5 min-h-96">
            <Tabs defaultValue="video" className="w-full">
                <TabsList  className="w-full">
                    <TabsTrigger value="video" className="w-1/2">Video</TabsTrigger>
                    <TabsTrigger value="announcement" className="w-1/2">Announcement</TabsTrigger>
                </TabsList>
                <TabsContent value="video">
                    <div className=" w-full flex justify-center items-center  py-5">
                        <div className="grid grid-cols-1 md:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                            {data?.video.map((video)=>{
                                return <OwnerVideoCard key={video.id} id={video.id} title={video.title} tumbnail={video.thumnailurl} ></OwnerVideoCard>
                            })}
                        </div>
                    </div>
                </TabsContent>
                <TabsContent value="announcement">
                <div className=" w-full flex justify-center items-center  py-5">
                        <div className="grid grid-cols-1 lg:grid-cols-2  xl:grid-cols-3  gap-5">
                            {data?.annoucement.map((announcement)=>{
                                return <AnnoucementCard owerid={announcement.userid} title={announcement.title}discription={announcement.discription} userimg={announcement.user.imgurl} likes={announcement._count.annoucementlike} dislikes={announcement._count.annoucementdislike} username={announcement.user.name} userbookmark={announcement.annoucementbookmark} userlike={announcement.annoucementlike} userdislike={announcement.annoucementdislike} key={announcement.id} id={announcement.id} ></AnnoucementCard>
                            })}
                        </div>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    </div>      
}