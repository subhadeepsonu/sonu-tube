import { GetUserVideoById } from "@/data/getvideobyid"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export default async function Watchlater(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetUserVideoById(decoded.id)
    return <div className="min-h-screen w-full flex flex-col justify-start bg-gray-100 items-center pt-20 md:pl-20">
        {JSON.stringify(data)}video
        </div>
}