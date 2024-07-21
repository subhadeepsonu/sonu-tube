import { GetVideoById } from "@/actions/video/videobyid"
import { views } from "@/actions/video/view";
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
    const check = await views(decoded.id,id)
    return <div className="min-h-screen w-full flex flex-col justify-start items-start pb-20 md:pb-0 pt-20   bg-gray-50">
        <div className="md:h-[450px] h-[300px] w-full">
        <VideoPlayer url={data?.videourl!} ></VideoPlayer>
        </div>
        <div className="">
        <p className="text-3xl font-semibold p-2">
            {data?.title}
        </p>
        <div className="flex justify-start items-center ">
        <div className="flex items-center px-2 mr-2 bg-white rounded-full border-2 border-gray-100">
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
        <p className="pl-2 text-lg border-2 bg-white border-gray-100 rounded-full px-2 py-1 shadow-sm">views: {data?._count.views}</p>
        <VideoHandler id={data?.id!} dislikeCount={data?._count.dislike!} likeCount={data?._count.like!} userdislikes={data?.dislike}userlikes={data?.like} userid={decoded.id}></VideoHandler>
        </div>
        </div>
        <div className="w-full bg-white">
        <p className="pl-2 pt-2 text-lg font-semibold">Discription</p>
        <p className=" pl-2">{data?.discription}</p>
        </div>
    </div>
}