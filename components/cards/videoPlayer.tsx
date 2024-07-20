"use client"
import ReactPlayer from 'react-player'
export default function VideoPlayer(props:{
    url:string
}){
    return <div className='h-full w-full '>
        <ReactPlayer controls={true} height={"100%"} width={"100%"}   url={props.url}></ReactPlayer>
    </div>
    
    
}