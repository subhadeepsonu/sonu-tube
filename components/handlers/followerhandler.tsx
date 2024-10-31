"use client"

import { useMutation } from "@tanstack/react-query"
import { useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
import axios from "axios"
export default function FollowerHandler(props: {
    following: boolean,
    followerCount: number,
    channelid: string,
    name: string
}) {
    const [follow, setFollow] = useState(props.followerCount)
    const [follows, SetFollows] = useState(props.following)
    const MutateFollow = useMutation({
        mutationFn: async () => {
            console.log(follow)
            console.log(follows)
            const response = await axios.post("/api/user/follow", {
                followerid: props.channelid
            })
            return response.data
        },
        onSuccess: () => {
            toast.success(`following ${props.name}`)
        },
        onError: () => {
            toast.error("something went wrong")
        }
    })
    const MutateUnfollow = useMutation({
        mutationFn: async () => {
            const response = await axios.delete("/api/user/follow", {
                data: {
                    followerid: props.channelid
                }
            })
            return response.data
        },
        onSuccess: () => {
            toast.warning(`UnFollowed ${props.name}`)
        },
        onError: () => {
            toast.error("something went wrong")
        }
    })


    return <div className=" h-20 rounded-lg flex justify-center items-center">
        {(follows) ? <Button onClick={() => {
            setFollow(follow - 1)
            SetFollows(false)
            MutateUnfollow.mutate()
        }} variant={"secondary"}>Following</Button> : <Button onClick={() => {
            setFollow(follow + 1)
            SetFollows(true)
            MutateFollow.mutate()

        }}>Follow</Button>}

    </div>
}