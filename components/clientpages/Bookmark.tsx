"use client"
import { useBookMarkStore } from "@/store/BookMarkStore"
import { annoucementType } from "@/types/annoucementTypes"
import AnnoucementCard from "../cards/announcementCard"
export default function Bookmark() {
    const { videos } = useBookMarkStore()
    return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-3 px-3 pt-3 w-full">
            {videos.map((announcement: annoucementType) => {
                return <AnnoucementCard OwnerName="" bookmarked={announcement.BookMarked} disliked={announcement.Disliked} liked={announcement.Liked} ownerId="" ownerImage="" key={announcement.id} id={announcement.id} discription={announcement.description} title={announcement.title} likes={announcement.likes} dislikes={announcement.dislikes}   >
                </AnnoucementCard>
            })}
        </div>
    </div>
}