import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AnnoucementHandler from "../handlers/announcementhandler";
import CommentButton from "./commentButton";
import AnnouncementBookmark from "./annoucementBookmark";
import Link from "next/link";
export default function AnnoucementCard(props:{
    userimg:string,
    username:string,
    userbookmark:any,
    id:number,
    title:string,
    discription:string,
    userlike:any,
    userdislike:any,
    likes:number,
    dislikes:number,
    owerid:string
}){
    
    return <div className="bg-white dark:bg-transparent dark:border-zinc-800 border-2 border-gray-100 dark:border-2 dark:text-gray-100 w-[350px] h-80 p-3  shadow-sm flex flex-col justify-start items-start text-black rounded-lg ">
        <div className="flex w-full justify-between items-center">
            <div className="flex justify-between items-center">
                <Link href={`/profile/${props.owerid}`}>
        <Avatar>
            <AvatarImage className="object-cover" src={props.userimg}>
            </AvatarImage>
            <AvatarFallback>s</AvatarFallback>
        </Avatar>
        </Link>
        <div className="pl-2">{props.username}</div>
        </div>
        <AnnouncementBookmark bookmarks={props.userbookmark} userid={""} announcementid={props.id}></AnnouncementBookmark>
        </div>
        <div className="pt-2">
        <p className="font-semibold text-lg">{props.title}</p>
        <div className="overflow-ellipsis overflow-hidden  w-[320] h-44 pt-1">{props.discription}</div>
        </div>
        <div className="flex w-full justify-between">
        <AnnoucementHandler userlike={props.userlike} userdislike={props.userdislike} id={props.id} likes={props.likes} dislikes={props.dislikes}></AnnoucementHandler>
        <CommentButton id={props.id}></CommentButton>
        </div>
    </div>
}