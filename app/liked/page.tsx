import { GetLikedVideo } from "@/actions/video/likedvideo"
import VideoCard from "@/components/cards/videocard"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { FaThumbsUp } from "react-icons/fa"
export default async function LikedPage() {
    const token = cookies().get('token')
    const decoded: any = jwtDecode(token?.value!)
    const data = await GetLikedVideo(decoded.id)
    return <div className="min-h-screen w-full flex flex-col dark:bg-zinc-950 justify-center bg-white items-center pt-20 md:pl-20 pb-20">
        <div className=" flex w-full justify-center  items-center my-2   md:pl-0">
            <div className="h-10 w-10 bg-green-200 rounded-lg flex justify-center items-center ">
                <FaThumbsUp className="text-2xl text-green-600"></FaThumbsUp>
            </div>
            <p className="font-semibold text-2xl  flex justify-center pl-2   items-center py-2 ">Liked videos</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data.map((video) => {
                return <VideoCard videoholderid={video.userId} watchlater={false} userid={decoded.id} key={video.id} id={video.video.id} userimage={video.video.user.imgurl!} name={video.video.user
                    .name} views={video.video._count.views} imgurl={video.video.thumnailurl} title={video.video.title}
                ></VideoCard>
            })}
        </div>
    </div>
}