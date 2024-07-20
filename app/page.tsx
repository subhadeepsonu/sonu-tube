import VideoCard from "@/components/cards/videocard";
import GetAllVideos from "@/data/getallvideo";
export default async function Home() {
  const data = await GetAllVideos()
  return (
    <div className="min-h-screen w-full flex-col flex justify-start items-center bg-gray-50 pt-20 pl-24" >
      <div className="grid grid-cols-4 gap-5">
      {data.map((video,index:number)=>{
          return <VideoCard key={index} id={video.id} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgurl={video.thumnailurl} title={video.title} >
          </VideoCard>
      })}
      </div>
    </div>
  );
}
