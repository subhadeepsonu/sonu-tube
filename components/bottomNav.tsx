"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillProfile, AiOutlineProfile } from "react-icons/ai"
import { IoHomeOutline, IoHomeSharp, IoVideocamOutline, IoVideocamSharp } from "react-icons/io5"
import { PiSpeakerLowDuotone, PiSpeakerLowFill, PiTelevisionSimpleDuotone, PiTelevisionSimpleFill } from "react-icons/pi"
import { RiFireFill, RiFireLine } from "react-icons/ri"
export default function BottomNav(){
    const pathname = usePathname()
    if(pathname=="/auth"){
        return  null
    }
    return <div className="w-full h-16 fixed bottom-0 bg-white dark:bg-zinc-950 z-10 items-center justify-around  flex md:hidden">
        <Link href={"/"}>
        {(()=>{
            if(pathname=="/"){
                return <IoHomeSharp className="text-xl" />
            }
            else{
                return <IoHomeOutline className="text-xl" />
            }
        })()}
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
        
        </Link>
        <Link href={"/more"}>
        {(()=>{
            if(pathname=="/more"){
                return <AiFillProfile  className="text-2xl"/>
            }
            else{
                return <AiOutlineProfile  className="text-2xl"/>
            }
        })()}
        </Link>
    </div>
}