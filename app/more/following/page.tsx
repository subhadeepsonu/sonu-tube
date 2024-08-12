import { Followingchannels } from "@/actions/user/following"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import Link from "next/link"

export default async function FollowingPage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await Followingchannels(decoded.id)
    return <div className="min-h-screen w-full bg-gray-50 flex justify-center items-start pl-24 pt-20">
        <div className="grid grid-cols-4 gap-5">
        {data.map((channel)=>{
            return <Link href={`/profile/${channel.userId}`}>
            <div className="w-80 h-16  rounded-lg bg-white shadow-sm  flex justify-center items-center">
                    <img src={channel.user.imgurl} className="h-9 w-9 rounded-full object-cover mr-2"></img>
                    <p className="font-medium text-lg">
                        {channel.user.name}
                    </p>
                </div>
                </Link>
        })}
        </div>
    </div>
}