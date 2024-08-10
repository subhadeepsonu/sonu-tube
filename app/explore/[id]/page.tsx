import { GetvideoBytag } from "@/actions/recommendations/video"

export default async function ExploreCatPage({params}:{
    params:{
        id:string
    }
}){
    const data = await GetvideoBytag(params.id)
    return <div className="min-h-screen w-full flex justify-center items-center pt-20 pl-24">
        <div className="grid grid-cols-4 gap-5">
        {data.map((video)=>{
            return <div>
                {video.title}
            </div>
        })}
        </div>
    </div>
}