"use client";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTrigger,
} from "@/components/ui/sheet"
import { FaComments } from "react-icons/fa"
import CommentCard from "./commentCard"
import AnnouncementAddComment from "../forms/commentForm"
import { useQuery } from "@tanstack/react-query";
export default function CommentButton(props: {
    id: number
}) {
    const QueryComments = useQuery({
        queryKey: ["comments", props.id],
        queryFn: async () => {
            const res = await fetch(`/api/annoucement/comment?id=${props.id}`)
            return res.json()
        }
    })
    if (QueryComments.isLoading) {
        return <div className="w-fit h-full flex justify-center items-start">
            <FaComments className="hover:cursor-pointer text-2xl animate-pulse" />
        </div>
    }
    if (QueryComments.isError) {
        return <div>Error</div>
    }
    return <Sheet >
        <SheetTrigger>
            <FaComments className="hover:cursor-pointer text-2xl" />
        </SheetTrigger>
        <SheetContent className="bg-gray-50 dark:bg-black" side={"bottom"}>
            <SheetHeader className="font-bold text-3xl">
                Comments
            </SheetHeader>
            <SheetDescription className="flex h-96  justify-center items-start " >
                <div className="h-full w-full overflow-y-scroll overflow-x-hidden">
                    <AnnouncementAddComment announcementid={props.id}></AnnouncementAddComment>
                    {QueryComments.data.data.map((comment: any) => {
                        return <CommentCard key={comment.id} imgurl={comment.user.imgurl} username={comment.user.name} comment={comment.comment}></CommentCard>
                    })}
                </div>
            </SheetDescription>
        </SheetContent>
    </Sheet>
}