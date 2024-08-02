"use client"

import { useState } from "react"
import ReactPlayer from "react-player"

export default function HoverVideo(props:{
    imgurl:string,
    videourl:string
}){
    const [check,Setcheck] = useState(false)
    return <div onMouseEnter={()=>{
        Setcheck(true)
    }}
    onMouseLeave={()=>{
        Setcheck(false)
    }}
    className="w-80 h-56">
        {(check)?<ReactPlayer playing={true} url={props.videourl} height={224} width={320}></ReactPlayer>: <img className="object-cover h-full w-full rounded-t-lg" src={props.imgurl} alt="image"></img>}
    </div>
}