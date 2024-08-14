"use client"
import Link from "next/link";
import { AiFillProfile } from "react-icons/ai";
import { IoHomeOutline, IoVideocamOutline, IoVideocamSharp } from "react-icons/io5";
import {  RiFireFill, RiFireLine } from "react-icons/ri";
import { AiOutlineProfile } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import { PiSpeakerLowDuotone } from "react-icons/pi";
import { PiSpeakerLowFill } from "react-icons/pi";
export default function SideBar(){
    const pathname = usePathname()
    if(pathname.startsWith("/video")){
        return null
    }
    if(pathname=="/auth"){
        return null
    }
    return <div className="w-20  dark:text-white dark:bg-zinc-950 h-full hidden md:flex fixed left-0  justify-start items-start pt-20  bg-white   ">
        <div className="w-full  flex-col flex justify-between items-center">
        <Link className="flex justify-center items-center flex-col mb-10" href={'/'}>
        {(()=>{
            if(pathname=="/"){
                return <IoHomeSharp className="text-xl" />
            }
            else{
                return <IoHomeOutline className="text-xl" />
            }
        })()}
        <p className="text-[11px] font-light ">Home</p>
        </Link>
        <Link className="flex justify-center items-center flex-col mb-10" href={'/explore'}>
        {(()=>{
            if(pathname=="/explore"){
                return <RiFireFill className="text-2xl" />
            }
            else{
                return <RiFireLine className="text-2xl" />
            }
        })()}
        
        <p className="text-[11px] font-light ">explore</p>
        </Link>
        <Link className="flex justify-center items-center flex-col mb-10" href={'/more/uploadvideo'}>
        {(()=>{
            if(pathname=="/more/uploadvideo"){
                return <IoVideocamSharp  className="text-2xl" />
            }
            else{
                return <IoVideocamOutline className="text-2xl" />
            }
        })()}
        
        <p className="text-[11px] font-light ">Upload</p>
        </Link>
        <Link className="flex justify-center items-center flex-col mb-10" href={'/announcement'}>
        {(()=>{
            if(pathname=="/announcement"){
                return <PiSpeakerLowFill  className="text-2xl"/>
            }
            else{
                return <PiSpeakerLowDuotone  className="text-2xl"/>
            }
        })()}
        <p className="text-[11px] font-light ">Announments</p>
        </Link>
        <Link className="flex justify-center items-center flex-col mb-10" href={'/more'}>
        {(()=>{
            if(pathname=="/more"){
                return <AiFillProfile  className="text-2xl"/>
            }
            else{
                return <AiOutlineProfile  className="text-2xl"/>
            }
        })()}
        <p className="text-[11px] font-light ">Library</p>
        </Link>
        </div>
    </div>
}