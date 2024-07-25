import Link from "next/link";
export default function VideoCard(props:{
    id:number,
    imgurl:string,
    userimage:string,
    title:string,
    name:string,
    views:number
}){
    return <Link href={`/video/${props.id}`}> <div className="w-80 h-72 bg-white rounded-lg border-2 border-gray-50  shadow-sm flex flex-col justify-center items-start hover:cursor-pointer">
        <div className="w-80 p-2 h-52">
        <img className="object-cover h-full w-full rounded-lg" src={props.imgurl} alt="image"></img>
        </div>
        <div className="w-80 h-20 flex justify-start items-center p-2">
        <div className="flex justify-start items-start  ">
        <img className="rounded-full w-9 h-9 object-cover" src={props.userimage}></img>
        </div>
        <div className="flex flex-col justify-start items-center ">
        <p className=" h-1/2 truncate pl-2 text-clip w-60 text-xl font-semibold" >{props.title}</p>
        <p className=" h-1/4 pl-2 w-60 text-sm  font-light" >{props.name}</p>
        <p className =" h-1/4 pl-2 w-60 text-sm font-light" >{props.views}  views</p>
        </div>
        </div>
    </div>
    </Link>
}