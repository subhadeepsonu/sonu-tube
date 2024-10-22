"use client"
import { Skeleton } from "@/components/ui/skeleton"
import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import Link from "next/link"

export default function FollowingPage() {
    const QueryFollowing = useQuery({
        queryKey: ['following'],
        queryFn: async () => {
            const response = await axios.get('/api/user/follow')
            return response.data
        }
    })
    if (QueryFollowing.isLoading) {
        return <div className="min-h-screen w-full dark:bg-zinc-950 bg-gray-50 flex justify-center items-start md:pl-52 pt-12 pb-20 md:pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3 w-full">
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
                <Skeleton className="h-16 w-full" />
            </div>
        </div>
    }
    if (QueryFollowing.isError) {
        return <div>

        </div>
    }
    if (QueryFollowing.data) {
        return <div className="min-h-screen w-full dark:bg-zinc-950 bg-gray-50 flex justify-center items-start md:pl-52 pt-12 pb-20 md:pb-0">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-3 px-3 pt-3 w-full">
                {QueryFollowing.data.message.map((channel: any) => {
                    return <Link key={channel.id} href={`/profile/${channel.userId}`}>
                        <div className=" h-16 w-full  rounded-lg dark:bg-black border-2   bg-white shadow-sm  flex justify-center items-center">
                            <img src={channel.user.imgurl!} className="h-9 w-9 rounded-full object-cover mr-2"></img>
                            <p className="font-medium text-lg">
                                {channel.user.name}
                            </p>
                        </div>
                    </Link>
                })}
            </div>
        </div>
    }
}