"use client"

import { useState, useRef } from "react"
import ReactPlayer from "react-player"

export default function HoverVideo(props:{
    imgurl:string,
    videourl:string
}){
    const [check, Setcheck] = useState(false)
    const timerRef = useRef<NodeJS.Timeout | null>(null);

    const handleMouseEnter = () => {
        timerRef.current = setTimeout(() => {
            Setcheck(true)
        }, 250); 
    }
    const handleMouseLeave = () => {
        if (timerRef.current) {
            clearTimeout(timerRef.current);
            timerRef.current = null;
        }
        Setcheck(false);
    }

    return (
        <div 
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="w-80 h-56"
        >
            {check ? (
                <ReactPlayer playing={true} url={props.videourl} height={224} width={320} />
            ) : (
                <img 
                    className="object-cover h-full w-full rounded-t-lg" 
                    src={props.imgurl} 
                    alt="image"
                />
            )}
        </div>
    );
}
