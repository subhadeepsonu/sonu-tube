import VideoCard from "@/components/cards/videocard"
import { ExploreVideos } from "@/data/explore"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import { MdOutlineTrendingUp } from "react-icons/md";
export default async function ExplorePage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await ExploreVideos()
    return <div className="min-h-screen w-full  pt-20 pl-40 ">
        <p className="w-full pl-3 font-semibold text-2xl  flex justify-start items-center py-2 ">Trending videos <MdOutlineTrendingUp className="pl-2 text-4xl" /></p>
        <div className="grid grid-cols-4 gap-5">
            {data.map((video)=>{
                return <VideoCard  views={video._count.views} id={video.id} key={video.id} videoholderid={video.userid} title={video.title} videourl={video.videourl} userid={decoded.id} name={video.user.name} imgurl={video.thumnailurl} userimage={video.user.imgurl} watchlater={video.watchlater}  ></VideoCard>
            })}
        </div>

    </div>
}