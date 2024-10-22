"use client"
import AnnoucementCard from "@/components/cards/announcementCard"
import VideoCard from "@/components/cards/videocard"
import FollowerHandler from "@/components/handlers/followerhandler"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function Profile({ params }: {
    params: {
        id: string
    }
}) {

    const QueryProfile = useQuery({
        queryKey: ['profile', params.id],
        queryFn: async () => {
            const response = await axios.post(`/api/profile`, {
                data: {
                    id: params.id
                }
            })
            return response.data
        },

    })
    if (QueryProfile.isLoading) {
        return <div className="min-h-screen flex flex-col dark:bg-zinc-950 bg-gray-50 justify-start md:pl-52 pt-16 items-center pb-20">
            Loading
        </div>
    }
    if (QueryProfile.isError) {
        return <div className="min-h-screen flex flex-col dark:bg-zinc-950 bg-gray-50 justify-start md:pl-52 pt-16 items-center pb-20">
            Error
        </div>
    }
    if (QueryProfile.data) {
        return <div className="min-h-screen flex flex-col dark:bg-zinc-950 bg-gray-50 justify-start md:pl-52 pt-16 items-center pb-20  ">
            <div className=" p-3 rounded-lg h-40 w-full ">
                <img src="https://th.bing.com/th/id/OIG2.6bChLwKDF7ARn0f8J2PE?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Bgurl" className="h-full rounded-lg w-full object-cover " />
            </div>
            <div className="h-52 px-5  flex justify-start w-full items-center">

                <img src={QueryProfile.data.data?.imgurl!} className="md:h-44 md:w-44 w-36 h-36 rounded-full object-cover"></img>

                <div className="pl-5 flex flex-col  justify-center items-start ">
                    <p className="font-bold  text-2xl md:text-5xl py-2">{QueryProfile.data.data?.name}</p>
                    <p className="font-semibold">
                        {QueryProfile.data.data?._count.follows} Followers</p>
                    <p className="text-sm">
                        {QueryProfile.data.data?._count.annoucement} Announcements
                    </p>
                    <p className="text-sm pb-2">
                        {QueryProfile.data.data?._count.video} Videos
                    </p>
                    <FollowerHandler channelid={QueryProfile.data.data?.id!} userid={""} follower={QueryProfile.data.data?.follows} name={QueryProfile.data.data?.name!} ></FollowerHandler>
                </div>


            </div>
            <div className="w-11/12 py-5 min-h-96">
                <Tabs defaultValue="video" className="w-full">
                    <TabsList className="w-full">
                        <TabsTrigger value="video" className="w-1/2">Video</TabsTrigger>
                        <TabsTrigger value="announcement" className="w-1/2">Announcement</TabsTrigger>
                    </TabsList>
                    <TabsContent value="video">
                        <div className=" w-full flex justify-center items-center  py-5">
                            <div className="grid grid-cols-1 md:grid-cols-2 w-full xl:grid-cols-3 2xl:grid-cols-4 gap-5">
                                {QueryProfile.data.data?.video.map((video: any) => {
                                    return <VideoCard videoholderid={video.userid} id={video.id} title={video.title} imgurl={video.thumnailurl} views={video._count.views} key={video.id} watchlater={false} name={QueryProfile.data.data.name} userimage={QueryProfile.data.data.imgurl!}></VideoCard>
                                })}
                            </div>
                        </div>
                    </TabsContent>
                    <TabsContent value="announcement">
                        <div className=" w-full flex justify-center items-center  py-5">
                            <div className="grid grid-cols-1 lg:grid-cols-2 w-full  xl:grid-cols-3  gap-5">
                                {QueryProfile.data.data?.annoucement.map((announcement: any) => {
                                    return <AnnoucementCard OwnerName="" bookmarked={true} disliked={true} liked={false} ownerId="" ownerImage="" title={announcement.title} discription={announcement.discription} likes={announcement._count.annoucementlike} dislikes={announcement._count.annoucementdislike} key={announcement.id} id={announcement.id} ></AnnoucementCard>
                                })}
                            </div>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    }
}