"use client"
import AnnoucementCard from "@/components/cards/announcementCard"
import { Skeleton } from "@/components/ui/skeleton"
import { annoucementType } from "@/types/annoucementTypes"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export default function AnnouncementPage() {
    const Annoucements = useQuery({
        queryKey: ['annoucements'],
        queryFn: async () => {
            const response = await axios.get('/api/annoucement')
            console.log(response)
            return response.data
        }
    })
    if (Annoucements.isLoading) {
        return <div className="min-h-screen bg-gray-50  w-full dark:bg-zinc-950 flex flex-col md:justify-start justify-center items-center mb-20 pt-12 md:pl-52   pb-20">
            <div className="grid grid-cols-1 w-full lg:grid-cols-2 xl:grid-cols-3 gap-3 px-3 pt-3">
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
    if (Annoucements.isError) {
        return <div>Error</div>
    }
    if (Annoucements.data) {
        return <div className="min-h-screen w-full dark:bg-zinc-950 flex flex-col md:justify-start justify-center items-center mb-20 pt-12 md:pl-52  bg-gray-50 pb-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 px-3 pt-3">
                {Annoucements.data.data.map((announcement: annoucementType, index: number) => {
                    return <AnnoucementCard key={index} id={announcement.id} title={announcement.title} discription={announcement.description} likes={announcement.likes} dislikes={announcement.dislikes} bookmarked={announcement.BookMarked} liked={announcement.Liked} disliked={announcement.Disliked} ownerId="" OwnerName="" ownerImage="" ></AnnoucementCard>
                })}
            </div>
        </div>
    }
}