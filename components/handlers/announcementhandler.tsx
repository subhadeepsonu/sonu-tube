"use client"
import { FaComments } from "react-icons/fa";
import { BiLike } from "react-icons/bi";
import { BiDislike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { BiSolidLike } from "react-icons/bi";
import { BiSolidDislike } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import {jwtDecode} from "jwt-decode"
import Cookies from "universal-cookie";
export default function AnnoucementHandler(props:any){
    
    const cookie =  new Cookies()
    const token = cookie.get("token") || ""
    const decoded:any = jwtDecode(token)
    const [likes,setLikes]=useState(props.likes)
    const [dislikes,setDislikes]=useState(props.dislikes)
    const [liked,SetLiked]=useState(false)
    const [disliked,SetDisliked]=useState(false)
    useEffect(()=>{
        console.log(decoded)
        const userliked= props.userlike
        const userdisliked=props.userdislike
       userliked.forEach((likes:any)=>{
        if(likes.userid==decoded.id){
            SetLiked(true)
        }
       })
       userdisliked.forEach((dislikes:any)=>{
        if(dislikes.userid==decoded.id){
            SetDisliked(true)
        }
       })
        console.log(userliked)
        console.log("dis")
        console.log(userdisliked)
    },[])
    const MutateAddLike =  useMutation({
        mutationFn:async ()=>{
            const data = await axios.post("/api/annoucement/like",{
                userid:decoded.id,
                announcementid:props.id
            })
            return  data.data
        }
    })
    const MutateRemoveLike = useMutation({
        mutationFn:async ()=>{
            const data = await axios.delete("/api/annoucement/like",{
                data:{
                    userid:decoded.id,
                    announcementid:props.id
                }
            })
            return data.data
        }
    })
    const MutateAddDislike = useMutation({
        mutationFn:async ()=>{
            const data = await axios.post("/api/annoucement/dislike",{
                userid:decoded.id,
                announcementid:props.id
            })
            return data.data
        }
    })
    const MutateRemoveDislike = useMutation({
        mutationFn:async ()=>{
            const data = await axios.delete("/api/annoucement/dislike",{
                data:{
                    userid:decoded.id,
                    announcementid:props.id
                }
            })
            return data.data
        }
    })
    return <div className="w-full h-10 flex justify-between items-center">
    <div className="flex justify-center items-center">
        {(liked)?<BiSolidLike onClick={()=>{
            setLikes(likes-1)
            SetLiked(false)
            MutateRemoveLike.mutate()
        }} className="m-1 text-2xl hover:cursor-pointer" />:<BiLike onClick={()=>{
            setLikes(likes+1)
            SetLiked(true)
            if(disliked){
            setDislikes(dislikes-1)
            SetDisliked(false)
            }
            MutateAddLike.mutate()
        }} className="m-1 text-2xl hover:cursor-pointer" />}
        {likes} | {dislikes} 
        {(disliked)?<BiSolidDislike onClick={()=>{
            setDislikes(dislikes-1)
            SetDisliked(false)
            MutateRemoveDislike.mutate()
        }} className="m-1 text-2xl hover:cursor-pointer" />:<BiDislike onClick={()=>{
            setDislikes(dislikes+1)
            SetDisliked(true)
            if(liked){
            setLikes(likes-1)
            SetLiked(false)
            }
            MutateAddDislike.mutate()
        }} className="m-1 text-2xl hover:cursor-pointer" /> }
    </div>
    <FaComments className="hover:cursor-pointer text-2xl" />
    </div>

}