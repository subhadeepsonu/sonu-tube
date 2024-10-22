"use client"
import VideoCard from "@/components/cards/videocard"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export default function LikedPage() {
    const QueryLiked = useQuery({
        queryKey: [],
        queryFn: async () => {
            const response = await axios.get("/api/video/like")
            return response.data
        }
    })
    if (QueryLiked.isLoading) {
        return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 w-full pt-3">
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
                <Skeleton className="w-full h-72" />
            </div>
        </div>
    }
    if (QueryLiked.isError) {
        return <div className="flex justify-center items-center">
            error
        </div>
    }
    if (QueryLiked.data) {
        return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3">
                {QueryLiked.data.data.map((video: any) => {
                    return <VideoCard videoholderid={video.userId} watchlater={false} key={video.id} id={video.video.id} userimage={video.video.user.imgurl!} name={video.video.user
                        .name} views={video.video._count.views} imgurl={video.video.thumnailurl} title={video.video.title}
                    ></VideoCard>
                })}
            </div>
        </div>
    }

}