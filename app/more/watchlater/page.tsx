"use client"
import VideoCard from "@/components/cards/videocard"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export default function Watchlater() {
    const QueryWatchlater = useQuery({
        queryKey: ['watchlater'],
        queryFn: async () => {
            const response = await axios.get('/api/video/watchlater')
            return response.data
        }

    })
    if (QueryWatchlater.isLoading) {
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
    if (QueryWatchlater.isError) {
        return <div className="flex justify-center items-center">
            error
        </div>
    }

    if (QueryWatchlater.data) {
        if (QueryWatchlater.data.data.length === 0) {
            return <div className="flex justify-center items-center h-screen w-full md:pl-52">
                <p className="text-2xl font-bold">No Videos Found</p>
            </div>
        }
        return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3">
                {QueryWatchlater.data.data.map((video: any) => {
                    return <VideoCard videoholderid={video.userId} watchlater={video.MarkedAsWatchLater} key={video.id} id={video.video.id} imgurl={video.video.thumnailurl} name={video.user.name} title={video.video.title} userimage={video.user.imgurl!} views={video.video._count.views} >

                    </VideoCard>
                })}
            </div>
        </div>
    }

}