import Link from "next/link";
export default function VideoCard(props:{
    id:number,
    imgurl:string,
    userimage:string,
    title:string,
    name:string,
    views:number
}){
    return <Link href={`/video/${props.id}`}> <div className="w-80 h-72 bg-white rounded-lg   shadow-sm flex flex-col justify-center items-start hover:cursor-pointer">
        <div className="w-80  h-56">
        <img className="object-cover h-full w-full rounded-t-lg" src={props.imgurl} alt="image"></img>
        </div>
        <div className="w-80 h-16 flex justify-start items-start py-1 px-2">
        <div className="flex h-full justify-center items-center pr-1 ">
        <img className="rounded-full w-9 h-9 object-cover" src={props.userimage}></img>
        </div>
        <div className="flex h-16 pl-2 flex-col justify-start py-1 items-center ">
        <p className=" truncate text-clip w-60 text-[17px] font-semibold" >{props.title}</p>
        <div className="flex items-center justify-between w-full">
        <p className="text-sm  font-light" >{props.name}</p>
        <p className =" text-sm font-light" >{props.views}  views</p>
        </div>
        </div>
        </div>
    </div>
    </Link>
}