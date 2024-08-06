import { GetLikedVideo } from "@/actions/video/likedvideo"
import VideoCard from "@/components/cards/videocard"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function LikedPage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetLikedVideo(decoded.id)
    return <div className="min-h-screen w-full flex flex-col justify-start bg-gray-100 items-center pt-20 md:pl-20">
            <p className="text-2xl p-2 font-semibold">Liked Videos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">                
                {data.map((video)=>{
                    return <VideoCard videoholderid="" videourl={video.video.videourl} watchlater={video.video.watchlater} userid={video.video.userid} key={video.id} id={video.video.id} userimage={video.video.user.imgurl} name={video.video.user
                        .name} views={video.video._count.views} imgurl={video.video.thumnailurl} title={video.video.title}
                    ></VideoCard>
                })}
            </div>
    </div>      
}