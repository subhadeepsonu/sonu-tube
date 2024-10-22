"use client"
import VideoCard from "@/components/cards/videocard"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"

export default function HistoryPage() {
    const QueryLiked = useQuery({
        queryKey: ["liked"],
        queryFn: async () => {
            const response = await axios.get("/api/video/view")
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
        return < div className="flex justify-center items-center" >
            error
        </div >
    }
    if (QueryLiked.data) {
        return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3">
                {QueryLiked.data.data.map((history: any) => {
                    return <VideoCard videoholderid={history.userid} watchlater={false} key={history.id} id={history.video.id} imgurl={history.video.thumnailurl} name={history.video.user.name} title={history.video.title} userimage={history.video.user.imgurl!} views={history.video._count.views}></VideoCard>
                })}
            </div>
        </div>
    }

}