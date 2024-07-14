import VideoCard from "@/components/cards/videocard";
import GetAllVideos from "@/data/getallvideo";

export default async function Home() {
  const data = await GetAllVideos()
  return (
    <div className="min-h-screen w-full flex-col flex justify-start items-center pt-20 pl-24" >
      <div className="grid grid-cols-4 gap-5">
      {data.map((video,index:number)=>{
          return <VideoCard key={index} userimage={video.user.imgurl} name={video.user.name} views={video._count.views} imgrul={video.thumnailurl} title={video.title} >
          </VideoCard>
      })}
      </div>
      
    </div>
  );
}
