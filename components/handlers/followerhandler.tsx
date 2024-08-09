"use client"
import { AddFollow } from "@/actions/user/follow"
import { Unfollow } from "@/actions/user/unfollow"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import { toast } from "sonner"
export default function FollowerHandler(props:{
    follower:any,
    userid:string,
    channelid:string,
    name:string
}){
    const MutateFollow = useMutation({
        mutationFn:()=>AddFollow(props.userid,props.channelid),
        onSuccess:()=>{
            toast.success(`following ${props.name}`)
        },
        onError:()=>{
            toast.error("something went wrong")
        }
    })
    const MutateUnfollow = useMutation({
        mutationFn:()=>Unfollow(props.userid,props.channelid),
        onSuccess:()=>{
            toast.warning(`UnFollowed ${props.name}`)
        },
        onError:()=>{
            toast.error("something went wrong")
        }
    })
   
    const [follow,setFollow] = useState(props.follower)
    const [follows,SetFollows] = useState(false)
    useEffect(()=>{
        follow.forEach((user:any) => {
            if(user.follwerId==props.userid){
                SetFollows(true);
            }
        });
    },[props.follower,props.userid])
    return <div>
        {(follows)?<Button onClick={()=>{
            MutateUnfollow.mutate()
            SetFollows(false)
        }} variant={"secondary"}>Following</Button>:<Button onClick={()=>{
            MutateFollow.mutate()
            SetFollows(true)
        }}>Follow</Button>}
    </div>
}