"use client"
import VideoCard from "@/components/cards/videocard"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
export default function ExploreCatPage({ params }: {
    params: {
        id: string
    }
}) {
    const QueryByid = useQuery({
        queryKey: ['explore', params.id],
        queryFn: async () => {
            const response = await axios.post(`/api/video/explore/bytag`, {
                tag: params.id
            })
            console.log(response.data)
            return response.data
        }
    })
    if (QueryByid.isLoading) {
        return <div className="h-screen w-full flex justify-center items-center">
            Loading
        </div>
    }
    if (QueryByid.isError) {
        return <div>Error</div>
    }
    if (QueryByid.data) {
        return <div className="min-h-screen w-full dark:bg-black bg-gray-50 flex justify-center items-start pt-12 md:pl-52">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3">
                {QueryByid.data.data.map((video: any) => {
                    return <VideoCard watchlater={false} key={video.id} id={video.id} imgurl={video.thumnailurl} name={video.user.name} title={video.title} videoholderid={video.userid} userimage={video.user.imgurl!} views={video._count.views}  >

                    </VideoCard>
                })}
            </div>
        </div>
    }
}