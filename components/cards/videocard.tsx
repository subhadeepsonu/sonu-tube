"use client"
import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
export default function VideoCard(props: {
    id: number,
    imgurl: string,
    userimage: string,
    title: string,
    videoholderid: string,
    name: string,
    views: number,
    userid: string,
    watchlater: boolean,
}) {
    return <div className="w-full h-72  border-2  dark:bg-black dark:border-gray-800 dark:text-white  rounded-lg relative   flex flex-col justify-center items-start hover:cursor-pointer">
        <Link href={`/video/${props.id}`} className="w-full">
            <div className="w-full bg-cyan-50  h-56">
                <img className="w-full h-full bg-red-200 object-cover rounded-t-lg" src={props.imgurl}></img>
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
                        <p className=" text-sm font-light pr-2" >{props.views}  views</p>
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
                        {(props.watchlater) ? <p>remove from watch later </p> : <p>Add to watch later</p>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </p>
    </div>

}