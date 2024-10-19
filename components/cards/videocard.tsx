"use client"
import Link from "next/link";
import { GoKebabHorizontal } from "react-icons/go";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useHomeVideoStore } from "@/store/homeVideoStore";

export default function VideoCard(props: {
    id: number,
    imgurl: string,
    userimage: string,
    title: string,
    videoholderid: string,
    name: string,
    views: number,
    userid: string,
    watchlater: Boolean,
}) {
    const { addWatchLater } = useHomeVideoStore()
    return <div className="w-full h-72  border-2 bg-white  dark:bg-black dark:border-gray-800 dark:text-white  rounded-md relative   flex flex-col justify-center items-start hover:cursor-pointer">
        <Link href={`/video/${props.id}`} className="w-full">
            <div className="w-full   h-56">
                <img className="w-full h-full  object-cover rounded-t-md" src={props.imgurl}></img>
            </div>
            <div className="w-full  h-16 flex justify-start items-start py-1 ">
                <div className="flex h-16 w-full  flex-col justify-start py-2 items-start px-2 ">
                    <p className=" truncate  w-full text-sm text-ellipsis font-semibold" >{props.title}</p>
                    <div className="flex items-center justify-between w-full ">
                        <Link className="hover:underline" href={`/profile/${props.videoholderid}`}>
                            <p className="text-sm  font-light" >{props.name}</p>
                        </Link>
                        <p className=" text-sm font-light pr-3" >{props.views}  views</p>
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
                        {(props.watchlater) ? <p className="w-full h-full" onClick={() => {
                            addWatchLater(props.id, !props.watchlater)
                        }}>remove from watch later </p> : <p className="w-full h-full" onClick={() => {

                            addWatchLater(props.id, !props.watchlater)
                        }}>Add to watch later</p>}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </p>
    </div>

}