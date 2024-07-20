import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
export default function CommentCard(props:{
    comment:string,
    username:string,
    imgurl:string
}){
    return <div className="min-h-28 w-full border-2   border-gray-100 shadow-sm rounded-lg my-2 p-2">
        <div className="flex justify-start items-center ">
        <Avatar>
            <AvatarImage className="object-cover" src={props.imgurl}></AvatarImage>
            <AvatarFallback></AvatarFallback>
        </Avatar>
        <div className="pl-2 font-semibold">
            {props.username}
        </div>
        </div>
        <div className="pt-2 pl-2">
            {props.comment}
        </div>
    </div>
}