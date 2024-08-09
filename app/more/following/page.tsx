import { Followingchannels } from "@/actions/user/following"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export default async function FollowingPage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await Followingchannels(decoded.id)
    return <div className="min-h-screen w-full bg-gray-100 flex justify-center items-center">
        {JSON.stringify(data)}
    </div>
}