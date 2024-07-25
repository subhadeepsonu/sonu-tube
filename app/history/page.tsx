import { GetHistory } from "@/actions/video/gethistory"
import VideoCard from "@/components/cards/videocard"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function HistoryPage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetHistory(decoded.id)
    return <div className="min-h-screen w-full flex justify-center items-center bg-gray-50 pt-20 pl-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {data.map((history)=>{
                return <VideoCard key={history.id} id={history.video.id} imgurl={history.video.thumnailurl} name={history.user.name} title={history.video.title} userimage={history.user.imgurl} views={history.video._count.views}></VideoCard>
            })}
        </div>
            
    </div>      
}