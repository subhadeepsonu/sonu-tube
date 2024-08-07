import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AnnoucementHandler from "../handlers/announcementhandler";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import CommentButton from "./commentButton";
import AnnouncementBookmark from "./annoucementBookmark";
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
    dislikes:number
}){
    const token:any = cookies().get('token')
    const decoded:any = jwtDecode(token?.value)
    return <div className="bg-white w-[350px] h-80 p-3  shadow-sm flex flex-col justify-start items-start text-black rounded-lg ">
        <div className="flex w-full justify-between items-center">
            <div className="flex justify-between items-center">
        <Avatar>
            <AvatarImage className="object-cover" src={props.userimg}>
            </AvatarImage>
            <AvatarFallback>s</AvatarFallback>
        </Avatar>
        <div className="pl-2">{props.username}</div>
        </div>
        <AnnouncementBookmark bookmarks={props.userbookmark} userid={decoded.id} announcementid={props.id}></AnnouncementBookmark>
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