"use client"
import VideoCard from "@/components/cards/videocard";
import { Skeleton } from "@/components/ui/skeleton";
import { useHomeVideoStore, } from "@/store/homeVideoStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useEffect } from "react";
export interface Root {
  data: Daum[]
  count: number
}

export type Daum = {
  id: number
  title: string
  discription: string
  thumnailurl: string
  videourl: string
  publish: boolean
  createdat: string
  userid: string
  tag: string
  user: User
  _count: Count
  MarkedAsWatchLater: Boolean
}

export interface User {
  name: string
  imgurl: string
  id: string
}

export interface Count {
  views: number
}
export default function Home(context: any) {
  const skip = (parseInt(context.searchParams.page) || 1) - 1
  const QueryVideos = useQuery({
    queryKey: ['videos', skip],
    queryFn: async () => {
      const respnse = await axios.get('/api/video')
      console.log(respnse.data)
      return respnse.data
    }
  })
  const { setVideos, videos } = useHomeVideoStore()
  useEffect(() => {
    if (QueryVideos.data) {
      setVideos(QueryVideos.data.data);
    }
  }, [QueryVideos.data, setVideos]);
  if (QueryVideos.isLoading) {
    return <div className="min-h-screen w-full bg-gray-50 dark:bg-black flex-col flex justify-center md:justify-start items-center  pt-12 md:pl-52 pb-20 md:pb-0 " >
      <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3 2xl:grid-cols-4 w-full  gap-2 px-2 pt-2">
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
        <Skeleton className="w-full h-72" />
      </div>
    </div>
  }
  if (QueryVideos.isError) {
    return <div>Error</div>
  }
  if (QueryVideos.data) {
    console.log(QueryVideos.data)
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-black flex-col flex justify-center md:justify-start items-center  pt-12 md:pl-52 pb-20 md:pb-0 " >
        <div className="grid grid-cols-1 sm:grid-cols-2  xl:grid-cols-3  2xl:grid-cols-4 w-full gap-3 px-3">
          {videos.map((video: Daum, index: number) => {
            console.log(video.MarkedAsWatchLater)
            return <VideoCard watchlater={video.MarkedAsWatchLater} videoholderid={video.user.id} key={index} id={video.id} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgurl={video.thumnailurl} title={video.title} >
            </VideoCard>
          })}

        </div>
      </div>
    );
  }
}
