"use client"
import { GetvideoBytag } from "@/actions/recommendations/video"
import { useQuery } from "@tanstack/react-query"
import SideVideoCard from "../cards/sidevideoCard"

export default function RecommandedVideo(props:{
    tag:any,
    currentvideoid:number
}){
    const QueryRecommendedVideo = useQuery({
        queryKey:["RecVideo"],
        queryFn:()=>GetvideoBytag(props.tag,props.currentvideoid)
    })
    if(QueryRecommendedVideo.isLoading){
        return <div className="h-screen w-full flex justify-center items-center">
            loading
        </div>
    }
    if(QueryRecommendedVideo.isError){
        return <div className="h-screen w-full flex justify-center items-center">
            error
        </div>
    }
    if(QueryRecommendedVideo.data){
        return <div>
            {QueryRecommendedVideo.data.map((video)=>{
                return <SideVideoCard id={video.id} key={video.id} imgurl={video.thumnailurl} name={video.user.name} title={video.title} views={video._count.views}></SideVideoCard>
            })}
        </div>
    }
}