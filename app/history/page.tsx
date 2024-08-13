import { GetHistory } from "@/actions/video/gethistory"
import VideoCard from "@/components/cards/videocard"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function HistoryPage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetHistory(decoded.id)
    return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-900 bg-gray-100 items-center pt-20 md:pl-20 pb-20">
        <p className="text-2xl p-2 font-semibold">History</p>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
        {data.map((history)=>{
                return <VideoCard videoholderid={history.userid} videourl={history.video.videourl} watchlater={history.video.watchlater} userid={decoded.id} key={history.id} id={history.video.id} imgurl={history.video.thumnailurl} name={history.video.user.name} title={history.video.title} userimage={history.video.user.imgurl} views={history.video._count.views}></VideoCard>
            })}
        </div>
    </div>      
}