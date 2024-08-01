import EmptyCard from "@/components/cards/empty"
import VideoCard from "@/components/cards/videocard"
import { Button } from "@/components/ui/button"
import { GetUserVideoById } from "@/data/getvideobyid"
import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
export default async function Watchlater(){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const data = await GetUserVideoById(decoded.id)
    if(data.length==0){
        return  <div className="min-h-screen w-full flex flex-col justify-center bg-gray-100 items-center pt-20 md:pl-20">
        <EmptyCard></EmptyCard>
        
        <Sheet>
                        <SheetTrigger>
                    <Button className="absolute bottom-2 right-2">Add Video</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle >Add Video</SheetTitle>
                            <SheetDescription>
                                
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
        
</div>
    }
    return <div className="min-h-screen w-full flex flex-col justify-start bg-gray-100 items-center pt-20 md:pl-20">
       <Sheet>
                        <SheetTrigger>
                    <Button className="absolute bottom-2 right-2">Add Video</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle >Add Video</SheetTitle>
                            <SheetDescription>
                                
                            </SheetDescription>
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-5">
            {data.map((video)=>{
                return <VideoCard key={video.id} id={video.id} imgurl={video.thumnailurl} name={video.user.name} title={video.title} userimage={video.user.imgurl} views={video._count.views} >
                    
                </VideoCard>
            })}
          </div>
        </div>
}