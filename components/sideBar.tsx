"use client"
import Link from "next/link";
import { BiSolidLike } from "react-icons/bi";
import { AiFillProfile } from "react-icons/ai";
import { IoHomeOutline, IoVideocamOutline, IoVideocamSharp } from "react-icons/io5";
import { BiLike } from "react-icons/bi";
import { RiChatHistoryLine, RiFireFill, RiFireLine } from "react-icons/ri";
import { RiChatHistoryFill } from "react-icons/ri";
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
    return <div className="w-24 z-10 h-full hidden md:flex fixed left-0  justify-start items-start pt-20  bg-white  shadow-sm ">
        <div className="w-full h-4/6 flex-col flex justify-between items-center">
        <Link className="flex justify-center items-center flex-col" href={'/'}>
        {(()=>{
            if(pathname=="/"){
                return <IoHomeSharp className="text-xl" />
            }
            else{
                return <IoHomeOutline className="text-xl" />
            }
        })()}
        <p className="text-xs">Home</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/explore'}>
        {(()=>{
            if(pathname=="/explore"){
                return <RiFireFill className="text-2xl" />
            }
            else{
                return <RiFireLine className="text-2xl" />
            }
        })()}
        
        <p className="text-xs">explore</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/more/uploadvideo'}>
        {(()=>{
            if(pathname=="/more/uploadvideo"){
                return <IoVideocamSharp  className="text-2xl" />
            }
            else{
                return <IoVideocamOutline className="text-2xl" />
            }
        })()}
        
        <p className="text-xs">Upload</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/announcement'}>
        {(()=>{
            if(pathname=="/announcement"){
                return <PiSpeakerLowFill  className="text-2xl"/>
            }
            else{
                return <PiSpeakerLowDuotone  className="text-2xl"/>
            }
        })()}
        <p className="text-xs">Announments</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/more'}>
        {(()=>{
            if(pathname=="/more"){
                return <AiFillProfile  className="text-2xl"/>
            }
            else{
                return <AiOutlineProfile  className="text-2xl"/>
            }
        })()}
        <p className="text-xs">Library</p>
        </Link>
        </div>
    </div>
}