import { GetHistory } from "@/actions/video/gethistory"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
export default async function HistoryPage(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetHistory(decoded.id)
    return <div className="min-h-screen w-full flex justify-center items-center bg-gray-100 pt-20 pl-20">
            {JSON.stringify(data)}
    </div>      
}