import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import WatchLaterHandler from "../handlers/watchlaterhandler";
import { cookies } from "next/headers";
import { jwtDecode } from "jwt-decode";
import HoverVideo from "./hovervideo";
  
export default function VideoCard(props:{
    id:number,
    imgurl:string,
    userimage:string,
    title:string,
    videoholderid:string,
    name:string,
    views:number,
    userid:string,
    watchlater:any,
    videourl:string
}){
    
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    return <div className="   w-80 h-72 bg-white dark:border-zinc-900 dark:bg-black dark:text-white  rounded-lg relative border-2 border-gray-100 shadow-sm flex flex-col justify-center items-start hover:cursor-pointer">
        <Link href={`/video/${props.id}`}> 
        <div className="w-80  h-56">
        <HoverVideo imgurl={props.imgurl} videourl={props.videourl}></HoverVideo>
        </div>
        <div className="w-80 h-16 flex justify-start items-start py-1 ">
        <div className="flex h-full w-12 justify-center items-center  ">
            <Link href={`/profile/${props.videoholderid}`}>
        <img className="rounded-full w-9 h-9 object-cover" src={props.userimage}></img>
        </Link>
        </div>
        <div className="flex h-16  flex-col justify-start py-2 items-center ">
        <p className=" truncate  w-64 text-sm text-ellipsis font-semibold" >{props.title}</p>
        <div className="flex items-center justify-between w-full">
        <p className="text-sm  font-light" >{props.name}</p>
        <p className =" text-sm font-light pr-2" >{props.views}  views</p>
        </div>
        </div>
        </div>
        </Link>
        <p className="flex absolute  bottom-5 right-0  justify-end items-end ml-1  w-4 h-full">
            <DropdownMenu>
                <DropdownMenuTrigger>
                <GoKebabHorizontal className="rotate-90 text-xl" />
                </DropdownMenuTrigger>
                <DropdownMenuContent className="border-0">
                    <DropdownMenuItem >
                        <WatchLaterHandler userid={decoded.id} watchlater={props.watchlater} videoid={props.id}></WatchLaterHandler>
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </p>
    </div>
    
}