"use client"
import VideoCard from "@/components/cards/videocard"
import CatTag from "@/components/utils/cattag";
import { ExploreVideos } from "@/data/explore"
import { useQuery } from "@tanstack/react-query";
import { MdOutlineTrendingUp } from "react-icons/md";

export default  function ExplorePage(){
    
    
    
    const trending = useQuery({
        queryKey:['explore'],
        queryFn:()=>ExploreVideos()
    })
    if(trending.isLoading){
        return <div className="h-screen w-full  flex justify-center items-center">Loading</div>
    }
    if(trending.isError){
        return <div>Error</div>
    }
    if(trending.data){
        
    return <div className="min-h-screen w-full dark:bg-zinc-950 bg-white  pt-20 md:pl-60 hide-scrollbar pb-20">
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
         <div className=" flex justify-start items-center my-2 ml-5 md:pl-0">
            <div className="h-12 w-12 bg-red-200 rounded-lg flex justify-center items-center">
            <MdOutlineTrendingUp className="text-red-700 text-4xl" />
            </div>
        <p className="w-full  font-semibold text-2xl  flex justify-start pl-2   items-center py-2 ">Trending videos</p>
        </div>
        <div className="flex justify-center items-center w-full ">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
            {trending.data.map((video)=>{
                return <VideoCard  views={video._count.views} id={video.id} key={video.id} videoholderid={video.userid} title={video.title} videourl={video.videourl} userid={"dd"} name={video.user.name} imgurl={video.thumnailurl} userimage={video.user.imgurl} watchlater={video.watchlater}  ></VideoCard>
            })}
        </div>
        </div>

    </div>
    }
}