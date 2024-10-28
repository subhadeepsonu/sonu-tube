"use client"

import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
export default function VideoHandler(props: {
    userlikes: any,
    userdislikes: any,
    likeCount: number,
    liked: boolean,
    disliked: boolean,
    dislikeCount: number,
    userid: string,
    id: number
}) {
    const [likes, setLikes] = useState(props.likeCount)
    const [dislikes, setDislikes] = useState(props.dislikeCount)
    const [isLiked, setIsLiked] = useState(props.liked)
    const [isDisLiked, setIsDisLiked] = useState(props.disliked)
    const MutateAddLike = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/video/like", {
                videoid: props.id
            })
            return response.data
        }
    })
    const MutateAddDislike = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/video/dislike", {
                videoid: props.id
            })
            return response.data
        }
    })
    const MutateRemoveLike = useMutation({
        mutationFn: async () => {
            const response = await axios.delete("/api/video/like", {
                data: {
                    videoid: props.id
                }
            })
            return response.data
        }
    })
    const MuatateRemoveDislike = useMutation({
        mutationFn: async () => {
            const response = await axios.delete("/api/video/dislike", {
                data: {
                    videoid: props.id
                }
            })
            return response.data
        }
    })

    return <div className="flex h-16 dark:bg-black items-center m-2 bg-white shadow-sm text-xl  justify-center rounded-lg ">
        {(isLiked) ? <BiSolidLike className="m-2 hover:cursor-pointer" onClick={() => {
            setLikes(likes - 1)
            setIsLiked(false)
            MutateRemoveLike.mutate()
        }}></BiSolidLike> : <BiLike className="m-2 hover:cursor-pointer" onClick={() => {
            if (isDisLiked) {
                setDislikes(dislikes - 1)
                setIsDisLiked(false)
            }
            setLikes(likes + 1)
            setIsLiked(true)
            MutateAddLike.mutate()
        }}></BiLike>} {likes} | {dislikes}
        {(isDisLiked) ? <BiSolidDislike className="m-2 hover:cursor-pointer" onClick={() => {
            setDislikes(dislikes - 1)
            setIsDisLiked(false)
            MuatateRemoveDislike.mutate()
        }}></BiSolidDislike> : <BiDislike className="m-2 hover:cursor-pointer" onClick={() => {
            if (isLiked) {
                setLikes(likes - 1)
                setIsLiked(false)
            }
            setDislikes(dislikes + 1)
            setIsDisLiked(true)
            MutateAddDislike.mutate()
        }}></BiDislike>}
    </div>
}