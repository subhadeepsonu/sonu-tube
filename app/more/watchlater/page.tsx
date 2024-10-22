import VideoCard from "@/components/cards/videocard"
import { GetWatchLaterById } from "@/data/getwatchlaterbyid"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function Watchlater() {
    const token = cookies().get('token')
    const decoded: any = jwtDecode(token?.value!)
    const data = await GetWatchLaterById(decoded.id)
    return <div className="min-h-screen w-full flex flex-col justify-start dark:bg-zinc-950 bg-gray-50 items-center pt-12 md:pl-52 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3">
            {data.map((video) => {
                return <VideoCard videoholderid={video.userId} watchlater={false} userid={decoded.id} key={video.id} id={video.video.id} imgurl={video.video.thumnailurl} name={video.user.name} title={video.video.title} userimage={video.user.imgurl!} views={video.video._count.views} >

                </VideoCard>
            })}
        </div>
    </div>
}