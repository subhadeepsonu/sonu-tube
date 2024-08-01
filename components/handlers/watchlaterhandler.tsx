"use client"
import { AddWatchlater, RemoveWatchLater } from "@/actions/video/watchlater"
import { useMutation } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { toast } from "sonner"
export default function WatchLaterHandler(props:{
      videoid:number,
      userid:string,
      watchlater:any
}){
    const [check,SetCheck] = useState(false)
    const MutateAddWatchLater = useMutation({
        mutationFn:()=>AddWatchlater(props.videoid),
        onSuccess:()=>{
            toast.success("Added")
        },
        onError:()=>{
            toast.error("something went wrong")
        }
    })
    const MutateRemoveWacthLater = useMutation({
        mutationFn:()=>RemoveWatchLater(props.videoid),
        onSuccess:()=>{
            toast.warning("Removed")
        },
        onError:()=>{
            toast.error("something went wrong")
        }
    })
    useEffect(()=>{
        props.watchlater.forEach((watch:any) => {
            
            if(watch.userId===props.userid){
                console.log(watch)
                SetCheck(true)
            }
        });
    },[props.userid,props.videoid,props.watchlater])
    if(check){
        return <div onClick={()=>{
            SetCheck(false)
            MutateRemoveWacthLater.mutate()
        }}>
           Remove watchlater
        </div>
    }
    return <div onClick={()=>{
        SetCheck(true)
        MutateAddWatchLater.mutate()
    }}>
        Add watchlater
    </div>
}