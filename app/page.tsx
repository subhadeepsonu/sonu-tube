import VideoCard from "@/components/cards/videocard";
import PaginationCard from "@/components/pagination";
import GetAllVideos from "@/data/getallvideo";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
export default async function Home(context:any) {
  const token = cookies().get('token')
  const decoded:any = jwtDecode(token?.value!)
  const skip = (parseInt(context.searchParams.page) || 1)-1
  const data = await GetAllVideos(skip)
  console.log(context.searchParams.page)
  return (
    <div className="min-h-screen w-full flex-col flex justify-center md:justify-start items-center bg-gray-100 pt-20 md:pl-20 pb-20 md:pb-0" >
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {data.data.map((video,index:number)=>{
          return <VideoCard videoholderid={video.userid} videourl={video.videourl} watchlater={video.watchlater} userid={decoded.id} key={index} id={video.id} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgurl={video.thumnailurl} title={video.title} >
          </VideoCard>
      })}
      
      </div>
      <PaginationCard  page={skip+1} total={data.count}></PaginationCard>
    </div>
  );
}
