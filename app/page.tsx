"use client"
import VideoCard from "@/components/cards/videocard";
// import PaginationCard from "@/components/pagination";
import GetAllVideos from "@/data/getallvideo";
import { useHomeVideoStore, } from "@/store/homeVideoStore";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
export default function Home(context: any) {
  const skip = (parseInt(context.searchParams.page) || 1) - 1
  const data: any = {
    data: []
  }
  console.log(context.searchParams.page)
  const QueryVideos = useQuery({
    queryKey: ['videos', skip],
    queryFn: () => GetAllVideos(skip),
  })
  const { setVideos, videos }: any = useHomeVideoStore()
  useEffect(() => {
    if (QueryVideos.data) {
      setVideos(QueryVideos.data.data);
    }
  }, [QueryVideos.data, setVideos]);
  if (QueryVideos.isLoading) {
    return <div className="h-screen w-full flex justify-center items-center">Loading</div>
  }
  if (QueryVideos.isError) {
    return <div>Error</div>
  }
  if (QueryVideos.data) {
    console.log(videos)
    return (
      <div className="min-h-screen w-full bg-gray-50 dark:bg-zinc-900 flex-col flex justify-center md:justify-start items-center  pt-20 md:pl-56 pb-20 md:pb-0 " >
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-full  gap-5 px-5">
          {videos.map((video: any, index: number) => {
            return <VideoCard watchlater={false} videoholderid={video.userid} userid={"1"} key={index} id={video.id} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgurl={video.thumnailurl} title={video.title} >
            </VideoCard>
          })}

        </div>
        {/* <PaginationCard page={skip + 1} total={data.count}></PaginationCard> */}
      </div>
    );
  }
}
