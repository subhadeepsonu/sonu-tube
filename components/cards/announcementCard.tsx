import Link from "next/link";
import { IoIosArrowRoundForward } from "react-icons/io";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AnnoucementHandler from "../handlers/announcementhandler";
export default function AnnoucementCard(props:any){
    return <div className=" w-96 h-80 p-3 border-2 border-gray-100 shadow-sm flex flex-col justify-start items-start text-black rounded-lg ">
        <div className="flex w-full justify-between items-center">
            <div className="flex justify-center items-center">
        <Avatar>
            <AvatarImage src={props.userimg}>
            </AvatarImage>
            <AvatarFallback>s</AvatarFallback>
        </Avatar>
        <div className="pl-2">{props.username}</div>
        </div>
       <Link className="hover:underline  flex justify-center items-center" href={""}>
        view more<IoIosArrowRoundForward className="text-xl -rotate-45" />
       </Link>
        </div>
        <div className="pt-2">
        <p className="font-semibold text-lg">{props.title}</p>
        <div className="overflow-ellipsis overflow-hidden  w-[370] h-44 pt-1">{props.discription}</div>
        </div>
        <AnnoucementHandler userlike={props.userlike} userdislike={props.userdislike} id={props.id} likes={props.likes} dislikes={props.dislikes}></AnnoucementHandler>
    </div>
}