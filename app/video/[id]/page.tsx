import { GetVideoById } from "@/actions/video/videobyid"
import { views } from "@/actions/video/view";
import CommentCard from "@/components/cards/commentCard";
import RecommandedVideo from "@/components/clientpages/RecommendingVideo";
import VideoAddComment from "@/components/forms/videocommentform";
import FollowerHandler from "@/components/handlers/followerhandler";
import VideoHandler from "@/components/handlers/videohandler";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Avatar } from "@radix-ui/react-avatar";
import { jwtDecode } from "jwt-decode";
import dynamic from "next/dynamic";
import { cookies } from "next/headers";
import Link from "next/link";
const VideoPlayer = dynamic(() => import('@/components/cards/videoPlayer'), {
    ssr: false,
});
export default async function VideoPlay({ params }: {
    params: {
        id: string
    }
}) {
    const id = parseInt(params.id, 10)
    const data = await GetVideoById(id)
    const token: any = cookies().get("token")
    const decoded: any = jwtDecode(token?.value)
    const check = await views(decoded.id, id)
    return <div className="min-h-screen w-full dark:bg-black flex justify-between items-start pb-20 md:pb-0 pt-20   bg-gray-50">

        <div className="lg:w-3/4 w-full">
            <div className="md:h-[450px] h-[300px] w-full">
                <VideoPlayer url={data?.videourl!} ></VideoPlayer>
            </div>
            <div className="">
                <p className="text-3xl font-semibold px-5">
                    {data?.title}
                </p>
                <div className="flex flex-wrap  px-5 ">
                    <Link href={`/profile/${data?.userid}`}>
                        <div className="flex items-center w-40 h-16 p-2  mr-2 dark:bg-transparent bg-white rounded-lg  shadow-sm">
                            <Avatar className="w-12 h-12  ">
                                <AvatarImage className="rounded-full object-cover" src={data?.user.imgurl!}>
                                </AvatarImage>
                                <AvatarFallback className="px-4">
                                    s
                                </AvatarFallback>
                            </Avatar>
                            <div className="flex flex-col justify-around items-start pl-2">
                                <p className="font-medium text-lg">
                                    {data?.user.name}

                                </p>
                                <p className="text-xs">{data?.user._count.follows} Followers</p>
                            </div>
                        </div>
                    </Link>
                    <p className=" text-lg  bg-white dark:bg-transparent h-16 px-2  rounded-lg flex justify-center items-center  shadow-sm">views: {data?._count.views}</p>
                    <VideoHandler id={data?.id!} dislikeCount={data?._count.dislike!} likeCount={data?._count.like!} userdislikes={data?.dislike} userlikes={data?.like} userid={decoded.id}></VideoHandler>
                    <FollowerHandler name={data?.user.name!} follower={data?.user.follows} userid={decoded.id} channelid={data?.userid!} key={data?.id}></FollowerHandler>
                </div>
            </div>
            <div className="w-full  px-5">
                <p className="p-2 pt-2 text-xl font-semibold">Discription</p>

                <p className=" bg-white dark:bg-transparent shadow-sm p-2">{data?.discription}</p>

            </div>
            <div className=" mt-2 w-full  flex flex-col justify-start items-center px-5 ">
                <div className="w-full flex justify-between items-center">
                    <p className="text-xl font-semibold py-1">Comments</p>

                </div>
                <VideoAddComment Videoid={data?.id!} userid={decoded.id} ></VideoAddComment>
                {data?.comment.map((comment) => {
                    return <CommentCard imgurl={comment.user.imgurl} username={comment.user.name} key={comment.id} comment={comment.comment}></CommentCard>
                })}
            </div>
        </div>
        <div className="w-1/4 hidden min-h-screen lg:flex justify-center items-start ">
            <RecommandedVideo currentvideoid={data?.id!} tag={data?.tag}></RecommandedVideo>
        </div>
    </div>
}