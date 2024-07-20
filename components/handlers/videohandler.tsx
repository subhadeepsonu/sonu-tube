"use client"
import { useEffect, useState } from "react";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
export default function  VideoHandler(props:{
    userlikes:any,
    userdislikes:any,
    likeCount:number,
    dislikeCount:number,
    userid:string
}){
    const [likes,setLikes]=useState(props.likeCount)
    const [dislikes,setDislikes]=useState(props.dislikeCount)
    const [isLiked,setIsLiked]= useState(false)
    const [isDisLiked,setIsDisLiked]= useState(false)
    useEffect(()=>{
        props.userlikes.forEach((like:any)=>{
            if(like.userid==props.userid){
                setIsLiked(true)
            }
        })
        props.userdislikes.forEach((dislikes:any)=>{
            if(dislikes.userid==props.userid){
                setIsDisLiked(true)
            }
        })
    },[props.dislikeCount,props.likeCount,props.userdislikes,props.userlikes,props.userid])
    return <div className="flex items-center m-2 bg-white shadow-sm text-xl  justify-center rounded-full border-2 border-gray-100 ">
        {(isLiked)?<BiSolidLike className="m-2 hover:cursor-pointer" onClick={()=>{
            setLikes(likes-1)
            setIsLiked(false)
        }}></BiSolidLike>:<BiLike className="m-2 hover:cursor-pointer" onClick={()=>{
            if(isDisLiked){
                setDislikes(dislikes-1)
                setIsDisLiked(false)
            }
            setLikes(likes+1)
            setIsLiked(true)
        }}></BiLike>} {likes} | {dislikes}
        {(isDisLiked)?<BiSolidDislike className="m-2 hover:cursor-pointer" onClick={()=>{
            setDislikes(dislikes-1)
            setIsDisLiked(false)
        }}></BiSolidDislike>:<BiDislike className="m-2 hover:cursor-pointer" onClick={()=>{
            if(isLiked){
                setLikes(likes-1)
                setIsLiked(false)
            }
            setDislikes(dislikes+1)
            setIsDisLiked(true)
        }}></BiDislike>}
    </div>
}