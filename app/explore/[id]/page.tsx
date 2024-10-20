import { GetvideoBytag } from "@/actions/recommendations/video"
import VideoCard from "@/components/cards/videocard"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function ExploreCatPage({ params }: {
    params: {
        id: string
    }
}) {
    const token = cookies().get('token')
    const decoded: any = jwtDecode(token?.value!)
    const data = await GetvideoBytag(params.id, 0)
    return <div className="min-h-screen w-full dark:bg-zinc-950 bg-gray-50 flex justify-center items-start pt-20 pl-24">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data.map((video) => {
                return <VideoCard watchlater={false} key={video.id} id={video.id} imgurl={video.thumnailurl} name={video.user.name} title={video.title} userid={decoded.id} videoholderid={video.userid} userimage={video.user.imgurl!} views={video._count.views}  >

                </VideoCard>
            })}
        </div>
    </div>
}