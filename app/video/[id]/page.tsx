import { GetVideoById } from "@/actions/video/videobyid"

export default async function VideoPlay(params:{
    params:{
        id:string
    }
}){
    const data = await GetVideoById(parseInt(params.params.id))
    return <div className="h-screen w-full flex justify-center items-center pt-20 pl-24">
        {JSON.stringify(data)}
    </div>
}