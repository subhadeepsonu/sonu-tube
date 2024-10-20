"use client"
import AnnoucementCard from "@/components/cards/announcementCard"
import { Skeleton } from "@/components/ui/skeleton"
import { annoucementType } from "@/types/annoucementTypes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export default function Watchlater() {
    const QueryBookMarks = useQuery({
        queryKey: ["Bookmark"],
        queryFn: async () => {
            const response = await axios.get("/api/annoucement/bookmark")
            return response.data
        }
    })
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
        return <div>

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