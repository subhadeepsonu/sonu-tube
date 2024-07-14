import TestButton from "@/components/button-test"
import { GetLikes } from "@/data/getLikes"

export default async function Page(){
    const data = await GetLikes()
    return <div className="flex justify-center items-center pt-20 pl-20 h-screen w-full">
        <TestButton></TestButton>
        <div className="grid grid-cols-4 gap-5">
        {data.map((like)=>{
            return <div key={like.id} className="h-20 w-80 border-2 border-gray-300">
                {like.id}
            </div>
        })}
    </div>
    </div>
}