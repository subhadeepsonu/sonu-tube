"use client"
import VideoCard from "@/components/cards/videocard"
import CatTag from "@/components/utils/cattag";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export default function ExplorePage() {
    const trending = useQuery({
        queryKey: ['explore'],
        queryFn: async () => {
            const response = await axios.get("/api/video/explore")
            return response.data
        }
    })
    if (trending.isLoading) {
        return <div className="h-screen w-full  flex justify-center items-center">Loading</div>
    }
    if (trending.isError) {
        return <div>Error</div>
    }
    if (trending.data) {
        return <div className="min-h-screen w-full dark:bg-zinc-950 bg-gray-50  pt-20 md:pl-52 hide-scrollbar pb-20">
            <div className="flex  flex-wrap ">
                <CatTag href="vlog" name="vlog"></CatTag>
                <CatTag href="education" name="education"></CatTag>
                <CatTag href="gaming" name="gaming"></CatTag>
                <CatTag href="tech" name="tech"></CatTag>
                <CatTag href="health" name="health"></CatTag>
                <CatTag href="fashion" name="fashion"></CatTag>
                <CatTag href="music" name="music"></CatTag>
                <CatTag href="cooking" name="cooking"></CatTag>
                <CatTag href="travel" name="travel"></CatTag>
                <CatTag href="science" name="science"></CatTag>
                <CatTag href="finance" name="finance"></CatTag>
                <CatTag href="art" name="art"></CatTag>
                <CatTag href="news" name="news"></CatTag>
                <CatTag href="motivational" name="motivational"></CatTag>
                <CatTag href="animals" name="animals"></CatTag>
                <CatTag href="automotive" name="automotive"></CatTag>
                <CatTag href="books" name="books"></CatTag>
                <CatTag href="sports" name="sports"></CatTag>
                <CatTag href="brainrot" name="brainrot"></CatTag>
                <CatTag href="action" name="action"></CatTag>
                <CatTag href="romance" name="romance"></CatTag>
                <CatTag href="love" name="love"></CatTag>

            </div>
            <div className="flex justify-center items-center w-full ">
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5 px-5">
                    {trending.data.data.map((video: any) => {
                        return <VideoCard views={video._count.views} id={video.id} key={video.id} videoholderid={video.userid} title={video.title} name={video.user.name} imgurl={video.thumnailurl} userimage={video.user.imgurl!} watchlater={video.MarkedAsWatchLater}  ></VideoCard>
                    })}
                </div>
            </div>

        </div>
    }
}