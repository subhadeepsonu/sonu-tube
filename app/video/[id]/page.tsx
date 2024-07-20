import { GetVideoById } from "@/actions/video/videobyid"
import VideoHandler from "@/components/handlers/videohandler";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
const VideoPlayer = dynamic(() => import('@/components/cards/videoPlayer'), {
    ssr: false,
  });

export default async function VideoPlay({params}:{params:{
    id:string
}}){
    const id = parseInt(params.id,10)
    const data = await GetVideoById(id)
    const token:any = cookies().get("token")
    const decoded:any = jwtDecode(token?.value)
    return <div className="h-screen w-full flex flex-col justify-start items-start pt-20 pl-24  bg-gray-50">

        <div className="h-[450px] w-full">
        <VideoPlayer url={data?.videourl!} ></VideoPlayer>
        </div>
        <div className="">
        <p className="text-3xl font-semibold p-2">
            {data?.title}
        </p>
        <div className="flex justify-between items-center ">
        <p className="pl-2 text-lg border-2 bg-white border-gray-100 rounded-full px-2 py-1 shadow-sm">views: {data?._count.views}</p>
        <VideoHandler dislikeCount={data?._count.dislike!} likeCount={data?._count.like!} userdislikes={data?.dislike}userlikes={data?.like} userid={decoded.id}></VideoHandler>
        </div>
        </div>
        <div className="w-full bg-white">
        <div className="pl-2 flex items-center">
            <Avatar className="w-9 h-9 ">
                <AvatarImage className="rounded-full object-cover" src={data?.user.imgurl}>
                </AvatarImage>
                <AvatarFallback className="px-4">
                    s
                </AvatarFallback>
            </Avatar>
            
            <p className="p-2">
                {data?.user.name}
            </p>
           
        </div>
        <p className="pl-2 pt-2 text-lg font-semibold">Discription</p>
        <p className=" pl-2">{data?.discription}</p>
        </div>
    </div>
}