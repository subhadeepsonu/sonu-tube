"use client"

import { useQuery } from "@tanstack/react-query"
import SideVideoCard from "../cards/sidevideoCard"
import axios from "axios"

export default function RecommandedVideo(props: {
    tag: any,
    currentvideoid: number
}) {
    const QueryRecommendedVideo = useQuery({
        queryKey: ["RecVideo"],

        queryFn: async () => {
            if (!props.tag || !props.currentvideoid) {
                throw new Error("Tag or current video ID missing");
            }
            const response = await axios.post("/api/video/recommended", {

                tag: props.tag,
                currentid: props.currentvideoid

            })
            console.log(response.data)
            return response.data
        },


    })
    if (QueryRecommendedVideo.isLoading) {
        return <div className="h-screen  w-full flex justify-center items-center">
            loading
        </div>
    }
    if (QueryRecommendedVideo.isError) {
        return <div className="h-screen w-full flex justify-center items-center">
            error
        </div>
    }
    if (QueryRecommendedVideo.data) {
        console.log(QueryRecommendedVideo.data)
        return <div>
            {QueryRecommendedVideo.data.data.map((video: any) => {
                return <SideVideoCard id={video.id} key={video.id} imgurl={video.thumnailurl} name={video.user.name} title={video.title} views={video._count.views}></SideVideoCard>
            })}
        </div>
    }
}