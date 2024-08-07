import VideoCard from "@/components/cards/videocard";
import GetAllVideos from "@/data/getallvideo";
import { jwtDecode } from "jwt-decode";
import { cookies } from "next/headers";
export default async function Home() {
  const token = cookies().get('token')
  const decoded:any = jwtDecode(token?.value!)
  const data = await GetAllVideos()
  return (
    <div className="min-h-screen w-full flex-col flex justify-center md:justify-start items-center bg-gray-100 pt-20 md:pl-20" >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
      {data.map((video,index:number)=>{
          return <VideoCard videoholderid={video.userid} videourl={video.videourl} watchlater={video.watchlater} userid={decoded.id} key={index} id={video.id} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgurl={video.thumnailurl} title={video.title} >
          </VideoCard>
      })}
      </div>
    </div>
  );
}
