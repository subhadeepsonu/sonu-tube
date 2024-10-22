"use client"

import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
export default function FollowerHandler(props: {
    follower: any,
    userid: string,
    channelid: string,
    name: string
}) {
    const MutateFollow = useMutation({
        mutationFn: async () => {

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

        },
        onSuccess: () => {
            toast.warning(`UnFollowed ${props.name}`)
        },
        onError: () => {
            toast.error("something went wrong")
        }
    })

    const [follow, setFollow] = useState(props.follower)
    const [follows, SetFollows] = useState(false)
    return <div className=" h-20 rounded-lg flex justify-center items-center">
        {(follows) ? <Button onClick={() => {
            MutateUnfollow.mutate()
            SetFollows(false)
        }} variant={"secondary"}>Following</Button> : <Button onClick={() => {
            MutateFollow.mutate()
            SetFollows(true)
        }}>Follow</Button>}
    </div>
}