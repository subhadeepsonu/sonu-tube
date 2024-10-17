import { GetComments } from "@/actions/annoucements/comment"
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
export default async function CommentButton(props:{
    id:number
}){
    const data = await GetComments(props.id)
    return <Sheet >
        <SheetTrigger>
        <FaComments  className="hover:cursor-pointer text-2xl" />
        </SheetTrigger>
        <SheetContent className="bg-gray-50 dark:bg-zinc-900" side={"bottom"}>
                <SheetHeader className="font-bold text-3xl">
                    Comments
                </SheetHeader>
                <SheetDescription className="flex h-96  justify-center items-start " >
                    <div className="h-full w-full overflow-y-scroll overflow-x-hidden">
                    <AnnouncementAddComment announcementid={props.id} userid={""}></AnnouncementAddComment>
                    {data.map((comment)=>{
                        return <CommentCard key={comment.id} imgurl={comment.user.imgurl} username={comment.user.name} comment={comment.comment}></CommentCard>
                    })}
                    </div>
                    
                </SheetDescription>
        </SheetContent>
    </Sheet>
}