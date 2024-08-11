import VideoCard from "@/components/cards/videocard"
import CatTag from "@/components/utils/cattag";
import { ExploreVideos } from "@/data/explore"
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
import Link from "next/link";
import { MdOutlineTrendingUp } from "react-icons/md";

export default async function ExplorePage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await ExploreVideos()
    return <div className="min-h-screen w-full bg-gray-50 pt-20 md:pl-28 hide-scrollbar">
        <p className="w-full  font-semibold text-2xl  flex justify-start items-center py-2 ">Explore your intrest</p>
         <div className="flex  flex-wrap ">
                <CatTag href="vlog" name="vlog"></CatTag>
                <CatTag href="education" name="education"></CatTag>
                <CatTag href="gaming" name="gaming"></CatTag>
                <CatTag href="tech" name="tech"></CatTag>
                <CatTag href="health" name="health"></CatTag>
                <CatTag href="fashion" name="fashion"></CatTag>
                <CatTag href="music" name="music"></CatTag>
                <CatTag href="cooking" name="cooking"></CatTag>
                <CatTag href="travel" name="travel"></CatTag>
                <CatTag href="science" name="science"></CatTag>
                <CatTag href="finance" name="finance"></CatTag>
                <CatTag href="art" name="art"></CatTag>
                <CatTag href="news" name="news"></CatTag>
                <CatTag href="motivational" name="motivational"></CatTag>
                <CatTag href="animals" name="animals"></CatTag>
                <CatTag href="automotive" name="automotive"></CatTag>
                <CatTag href="books" name="books"></CatTag>
                <CatTag href="sports" name="sports"></CatTag>
                <CatTag href="brainrot" name="brainrot"></CatTag>
                <CatTag href="action" name="action"></CatTag>
                <CatTag href="romance" name="romance"></CatTag>
                <CatTag href="love" name="love"></CatTag>

         </div>
        <p className="w-full  font-semibold text-2xl  flex justify-start items-center py-2 ">Trending videos <MdOutlineTrendingUp className="pl-2 text-4xl" /></p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data.map((video)=>{
                return <VideoCard  views={video._count.views} id={video.id} key={video.id} videoholderid={video.userid} title={video.title} videourl={video.videourl} userid={decoded.id} name={video.user.name} imgurl={video.thumnailurl} userimage={video.user.imgurl} watchlater={video.watchlater}  ></VideoCard>
            })}
        </div>

    </div>
}