import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import AnnoucementHandler from "../handlers/announcementhandler";
import AnnouncementBookmark from "./annoucementBookmark";
import Link from "next/link";
export default function AnnoucementCard(props: {
    id: number,
    title: string,
    discription: string,
    liked: boolean,
    disliked: boolean,
    bookmarked: boolean,
    likes: number,
    dislikes: number,
    ownerId: string,
    ownerImage: string,
    OwnerName: string
}) {
    return <div className="bg-white w-full dark:bg-transparent dark:border-zinc-800 border-2 border-gray-100 dark:border-2 dark:text-gray-100  h-80 p-3  shadow-sm flex flex-col justify-start items-start text-black rounded-lg ">
        <div className="flex w-full justify-between items-center">
            <div className="flex justify-between items-center">
                <Link href={`/profile/${props.ownerId}`}>
                    <Avatar>
                        <AvatarImage className="object-cover" src={props.ownerImage}>
                        </AvatarImage>
                        <AvatarFallback>s</AvatarFallback>
                    </Avatar>
                </Link>
                <div className="pl-2">{props.OwnerName}</div>
            </div>
            <AnnouncementBookmark bookmarks={props.bookmarked} announcementid={props.id}></AnnouncementBookmark>
        </div>
        <div className="pt-2">
            <p className="font-semibold text-lg">{props.title}</p>
            <div className="overflow-ellipsis overflow-hidden  w-[320] h-44 pt-1">{props.discription}</div>
        </div>
        <div className="flex w-full justify-between">
            <AnnoucementHandler disliked={props.disliked} liked={props.liked} id={props.id} likes={props.likes} dislikes={props.dislikes}></AnnoucementHandler>
            {/* <CommentButton id={props.id}></CommentButton> */}
        </div>
    </div>
}