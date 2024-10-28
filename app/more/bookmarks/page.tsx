"use client"
import AnnoucementCard from "@/components/cards/announcementCard"
import { Skeleton } from "@/components/ui/skeleton"
import { useBookMarkStore } from "@/store/BookMarkStore"
import { annoucementType } from "@/types/annoucementTypes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useEffect } from "react"
export default function Watchlater() {
    const { setVideos } = useBookMarkStore()
    const QueryBookMarks = useQuery({
        queryKey: ["bookmark"],
        queryFn: async () => {
            const response = await axios.get("/api/annoucement/bookmark")
            return response.data
        }
    })
    useEffect(() => {
        if (QueryBookMarks.data) {
            setVideos(QueryBookMarks.data.data)
        }
    }, [QueryBookMarks.data, setVideos])
    if (QueryBookMarks.isLoading) {
        return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 px-3 pt-3 w-full">
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
                <Skeleton className="w-full h-80" />
            </div>
        </div>
    }
    if (QueryBookMarks.isError) {
        return <div className="flex justify-center items-center h-screen w-full">
            Error
        </div>
    }
    if (QueryBookMarks.data) {
        return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 px-3 pt-3 w-full">
                {QueryBookMarks.data.data.map((announcement: annoucementType) => {
                    return <AnnoucementCard OwnerName="" bookmarked={announcement.BookMarked} disliked={announcement.Disliked} liked={announcement.Liked} ownerId="" ownerImage="" key={announcement.id} id={announcement.id} discription={announcement.description} title={announcement.title} likes={announcement.likes} dislikes={announcement.dislikes}   >
                    </AnnoucementCard>
                })}
            </div>
        </div>
    }
}