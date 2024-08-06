import VideoCard from "@/components/cards/videocard"
import { GetWatchLaterById } from "@/data/getwatchlaterbyid"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function Watchlater(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetWatchLaterById(decoded.id)
    return <div className="min-h-screen w-full flex flex-col justify-start bg-gray-100 items-center pt-20 md:pl-20">
        <p className="text-2xl p-2 font-semibold">Watch Later</p>
         <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {data.map((video)=>{
            return <VideoCard videoholderid="" videourl={video.video.videourl} userid={decoded.id} watchlater={video.video.watchlater} key={video.id} id={video.video.id} imgurl={video.video.thumnailurl} name={video.user.name} title={video.video.title} userimage={video.user.imgurl} views={video.video._count.views} >

            </VideoCard>
        })}
        </div>
        </div>
}