import Link from "next/link"
export default function SideVideoCard(props:{
    imgurl:string,
    title:string,
    name:string,
    views:number,
    id:number
}){
    return <Link href={`/video/${props.id}`}>
     <div className="h-40 w-80 rounded-lg bg-white flex py-2 border-2 border-gray-100 my-2">
        <img src={props.imgurl} alt="" className="h-full w-40 rounded-l-lg object-cover p-2"></img>
        <div className="w-40 h-full flex flex-col justify-around items-start pl-3">
            <p className="h-1/2 truncate text-wrap font-semibold pt-1">{props.title}</p>
            <div className="h-1/4 text-wrap truncate w-5/6">
            <p className="h-1/2 truncate">{props.name}</p>
            <p className="text-sm">{props.views} views</p>
            </div>
        </div>
    </div>
    </Link>
}