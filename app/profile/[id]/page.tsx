import {ProfileById} from "@/actions/user/profile"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
export default async function Profile({params}:{
    params:{
        id:string
    }
}){
    const data = await  ProfileById(params.id)
    return <div className="min-h-screen w-screen flex flex-col justify-start md:pl-24 pt-16 items-center  ">
        <div className=" p-3 rounded-lg h-40 w-full ">
            <img src="https://th.bing.com/th/id/OIG2.6bChLwKDF7ARn0f8J2PE?w=1024&h=1024&rs=1&pid=ImgDetMain" alt="Bgurl"  className="h-full rounded-lg w-full object-cover " />
        </div>
        <div className="h-52 px-5 w-full  flex justify-start  items-center">
            <img src={data?.imgurl} className="md:h-44 md:w-44 w-36 h-36 rounded-full object-cover"></img>
            <div className="pl-5 flex flex-col  justify-center items-start ">
                <p className="font-bold text-2xl md:text-5xl py-2">{data?.name}</p>
                <p>
                    {data?._count.annoucement} Announcements
                </p>
                <p>
                    {data?._count.video} Videos
                </p>
            </div>
        </div>
        <div className="w-11/12 py-5 min-h-screen  ">
            
        </div>
    </div>      
}