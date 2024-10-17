"use client"
import VideoCard from "@/components/cards/videocard";
import PaginationCard from "@/components/pagination";
import GetAllVideos from "@/data/getallvideo";
import { useQuery } from "@tanstack/react-query";
export default  function Home(context:any) {
  const skip = (parseInt(context.searchParams.page) || 1)-1
  const data:any={
    data:[]
  }
  console.log(context.searchParams.page)
  const QueryVideos = useQuery({
    queryKey: ['videos',skip],
    queryFn:()=> GetAllVideos(skip),
  })
  if(QueryVideos.isLoading){
    return <div className="h-screen w-full flex justify-center items-center">Loading</div>
  }
  if(QueryVideos.isError){
    return <div>Error</div>
  }
  if(QueryVideos.data){
  return (
    <div className="min-h-screen w-full bg-gray-50 dark:bg-zinc-900 flex-col flex justify-center md:justify-start items-center  pt-20 md:pl-60 pb-20 md:pb-0" >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3  gap-5">
      {QueryVideos.data.data.map((video,index:number)=>{
          return <VideoCard videoholderid={video.userid} videourl={video.videourl} watchlater={video.watchlater} userid={"1"} key={index} id={video.id} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgurl={video.thumnailurl} title={video.title} >
          </VideoCard>
      })}
      
      </div>
      <PaginationCard  page={skip+1} total={data.count}></PaginationCard>
    </div>
  );
}
}
