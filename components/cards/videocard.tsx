import Link from "next/link";
import { Avatar, AvatarImage } from "../ui/avatar";

export default function VideoCard(props:any){
    return <Link href={`/video/${props.id}`}> <div className="w-80 h-72 rounded-lg border-2 border-gray-200 flex flex-col justify-center items-start hover:cursor-pointer">
        <div className="w-80 p-2 h-48">
        <img className="object-contain h-full w-full rounded-lg" src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg" alt="image"></img>
        </div>
        <div className="w-80 h-24 flex p-2">
        <Avatar className="flex justify-center items-center">
        <AvatarImage className="w-16" src="https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg" alt="pp"></AvatarImage>
        </Avatar>
        <div className="flex flex-col justify-start items-center">
        <p className=" h-1/2 truncate pl-2 text-clip w-60 text-xl font-semibold" >{props.title}dd ddddd dddd ddd</p>
        <p className=" h-1/4 pl-2 w-60 text-sm  font-light" >{props.name}</p>
        <p className =" h-1/4 pl-2 w-60 text-sm font-light" >{props.views}  views</p>
        </div>
        </div>
    </div>
    </Link>
}