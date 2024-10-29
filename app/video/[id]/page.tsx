"use client"
import CommentCard from "@/components/cards/commentCard";
import RecommandedVideo from "@/components/clientpages/RecommendingVideo";
import VideoAddComment from "@/components/forms/videocommentform";
import FollowerHandler from "@/components/handlers/followerhandler";
import VideoHandler from "@/components/handlers/videohandler";
import { AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Avatar } from "@radix-ui/react-avatar";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Link from "next/link";
import ReactPlayer from "react-player";
import { useEffect, useState } from "react";
export default function VideoPlay({ params }: {
    params: {
        id: string
    }
}) {
    const [video, setVideo] = useState<any>(null)
    const QueryVideo = useQuery({
        queryKey: ['video', params.id],

        queryFn: async () => {
            const response = await axios.post("/api/video/byid", {
                id: parseInt(params.id)
            })
            console.log(response.data)
            return response.data
        }
    })
    useEffect(() => {
        if (QueryVideo.data) {
            setVideo(<ReactPlayer playing={true} controls={true} height={"100%"} width={"100%"} url={QueryVideo.data.data.videourl}></ReactPlayer>)
        }
    }, [QueryVideo.data])
    if (QueryVideo.isLoading) {
        return <div className="min-h-screen w-full flex justify-center items-center">
            Loading
        </div>
    }
    if (QueryVideo.isError) {
        return <div className="min-h-screen w-full flex justify-center items-center">
            Error
        </div>
    }
    if (QueryVideo.data) {
        return <div className="min-h-screen w-full dark:bg-black ba flex justify-between items-start pb-20 md:pb-0 pt-20   bg-gray-50">
            <div className="lg:w-3/4 w-full">
                <div className="md:h-[450px] h-[300px] w-full">
                    {video}
                </div>
                <div className="">
                    <p className="text-3xl font-semibold px-5">
                        {QueryVideo.data.data?.title}
                    </p>
                    <div className="flex flex-wrap  px-5 ">
                        <Link href={`/profile/${QueryVideo.data.data?.userid}`}>
                            <div className="flex items-center w-40 h-16 p-2  mr-2 dark:bg-transparent bg-white rounded-lg  shadow-sm">
                                <Avatar className="w-12 h-12  ">
                                    <AvatarImage className="rounded-full object-cover" src={QueryVideo.data.data?.user.imgurl!}>
                                    </AvatarImage>
                                    <AvatarFallback className="px-4">
                                        s
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex flex-col justify-around items-start pl-2">
                                    <p className="font-medium text-lg">
                                        {QueryVideo.data.data?.user.name}
                                    </p>
                                    <p className="text-xs">{QueryVideo.data.data?.user._count.follows} Followers</p>
                                </div>
                            </div>
                        </Link>
                        <p className=" text-lg  bg-white dark:bg-transparent h-16 px-2  rounded-lg flex justify-center items-center  shadow-sm">views: {QueryVideo.data.data?._count.views}</p>
                        <VideoHandler disliked={QueryVideo.data.data.disliked} liked={QueryVideo.data.data.liked} id={QueryVideo.data.data?.id!} dislikeCount={QueryVideo.data.data?._count.dislike!} likeCount={QueryVideo.data.data?._count.like!} userdislikes={QueryVideo.data.data?.dislike} userlikes={QueryVideo.data.data?.like} userid={""}></VideoHandler>
                        <FollowerHandler following={QueryVideo.data.data.following} name={QueryVideo.data.data?.user.name!} followerCount={QueryVideo.data.data.user._count.follows} channelid={QueryVideo.data.data?.userid!} key={QueryVideo.data.data?.id}></FollowerHandler>
                    </div>
                </div>
                <div className="w-full  px-5">
                    <p className="p-2 pt-2 text-xl font-semibold">Discription</p>

                    <p className=" bg-white dark:bg-transparent shadow-sm p-2">{QueryVideo.data.data?.discription}</p>

                </div>
                <div className=" mt-2 w-full  flex flex-col justify-start items-center px-5 ">
                    <div className="w-full flex justify-between items-center">
                        <p className="text-xl font-semibold py-1">Comments</p>

                    </div>
                    <VideoAddComment Videoid={QueryVideo.data.data?.id!} userid={""} ></VideoAddComment>
                    {QueryVideo.data.data?.comment.map((comment: any) => {
                        return <CommentCard imgurl={comment.user.imgurl} username={comment.user.name} key={comment.id} comment={comment.comment}></CommentCard>
                    })}
                </div>
            </div>
            <div className="w-1/4 hidden min-h-screen lg:flex justify-center items-start ">
                <RecommandedVideo currentvideoid={QueryVideo.data.data.id} tag={QueryVideo.data.data.tag}></RecommandedVideo>
            </div>
        </div>
    }
}