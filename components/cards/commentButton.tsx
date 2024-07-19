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
import { cookies } from "next/headers"
import { jwtDecode } from "jwt-decode"
export default async function CommentButton(props:{
    id:number
}){
    const data = await GetComments(props.id)
    const token:any = cookies().get('token')
    const decoded:any = jwtDecode(token?.value)
    return <Sheet>
        <SheetTrigger>
        <FaComments  className="hover:cursor-pointer text-2xl" />
        </SheetTrigger>
        <SheetContent side={"bottom"}>
                <SheetHeader className="font-bold text-3xl">
                    Comments
                </SheetHeader>
                <SheetDescription className="flex h-96  justify-center items-start " >
                    <div className="h-full w-full overflow-y-scroll overflow-x-hidden">
                    <AnnouncementAddComment announcementid={props.id} userid={decoded.id}></AnnouncementAddComment>
                    {data.map((comment)=>{
                        return <CommentCard key={comment.id} imgurl={comment.user.imgurl} username={comment.user.name} comment={comment.comment}></CommentCard>
                    })}
                    </div>
                    
                </SheetDescription>
        </SheetContent>
    </Sheet>
}