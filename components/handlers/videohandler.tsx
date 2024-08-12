"use client"
import { AddDisLikeVideo, RemoveDisLikeVideo } from "@/actions/video/dislike";
import { AddLikeVideo, RemoveLikeVideo } from "@/actions/video/like";
import { useMutation } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
export default function  VideoHandler(props:{
    userlikes:any,
    userdislikes:any,
    likeCount:number,
    dislikeCount:number,
    userid:string,
    id:number
}){
    const [likes,setLikes]=useState(props.likeCount)
    const [dislikes,setDislikes]=useState(props.dislikeCount)
    const [isLiked,setIsLiked]= useState(false)
    const [isDisLiked,setIsDisLiked]= useState(false)
    const MutateAddLike = useMutation({
        mutationFn:()=>AddLikeVideo(props.userid,props.id)
    })
    const MutateAddDislike = useMutation({
        mutationFn:()=>AddDisLikeVideo(props.userid,props.id)
    })
    const MutateRemoveLike = useMutation({
        mutationFn:()=>RemoveLikeVideo(props.userid,props.id)
    })
    const MuatateRemoveDislike = useMutation({
        mutationFn:()=>RemoveDisLikeVideo(props.userid,props.id)
    })
    useEffect(()=>{
        props.userlikes.forEach((like:any)=>{
            if(like.userId==props.userid){
                setIsLiked(true)
            }
        })
        props.userdislikes.forEach((dislikes:any)=>{
            if(dislikes.userId==props.userid){
                setIsDisLiked(true)
            }
        })
    },[props.dislikeCount,props.likeCount,props.userdislikes,props.userlikes,props.userid])
    return <div className="flex h-16 items-center m-2 bg-white shadow-sm text-xl  justify-center rounded-lg ">
        {(isLiked)?<BiSolidLike className="m-2 hover:cursor-pointer" onClick={()=>{
            setLikes(likes-1)
            setIsLiked(false)
            MutateRemoveLike.mutate()
        }}></BiSolidLike>:<BiLike className="m-2 hover:cursor-pointer" onClick={()=>{
            if(isDisLiked){
                setDislikes(dislikes-1)
                setIsDisLiked(false)
            }
            setLikes(likes+1)
            setIsLiked(true)
            MutateAddLike.mutate()
        }}></BiLike>} {likes} | {dislikes}
        {(isDisLiked)?<BiSolidDislike className="m-2 hover:cursor-pointer" onClick={()=>{
            setDislikes(dislikes-1)
            setIsDisLiked(false)
            MuatateRemoveDislike.mutate()
        }}></BiSolidDislike>:<BiDislike className="m-2 hover:cursor-pointer" onClick={()=>{
            if(isLiked){
                setLikes(likes-1)
                setIsLiked(false)
            }
            setDislikes(dislikes+1)
            setIsDisLiked(true)
            MutateAddDislike.mutate()
        }}></BiDislike>}
    </div>
}