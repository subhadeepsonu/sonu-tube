import { GetLikedVideo } from "@/actions/video/likedvideo"
import VideoCard from "@/components/cards/videocard"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { FaThumbsUp } from "react-icons/fa"
export default async function LikedPage() {
    const token = cookies().get('token')
    const decoded: any = jwtDecode(token?.value!)
    const data = await GetLikedVideo(decoded.id)
    return <div className="min-h-screen w-full flex flex-col dark:bg-zinc-950 justify-center bg-gray-50 items-center pt-12 md:pl-52 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3">
            {data.map((video) => {
                return <VideoCard videoholderid={video.userId} watchlater={false} userid={decoded.id} key={video.id} id={video.video.id} userimage={video.video.user.imgurl!} name={video.video.user
                    .name} views={video.video._count.views} imgurl={video.video.thumnailurl} title={video.video.title}
                ></VideoCard>
            })}
        </div>
    </div>
}