"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { AiFillProfile, AiOutlineProfile } from "react-icons/ai"
import { BiLike, BiSolidLike } from "react-icons/bi"
import { IoHomeOutline, IoHomeSharp } from "react-icons/io5"
import { PiSpeakerLowDuotone, PiSpeakerLowFill, PiTelevisionSimpleDuotone, PiTelevisionSimpleFill } from "react-icons/pi"
export default function BottomNav(){
    const pathname = usePathname()
    return <div className="w-full h-16 fixed bottom-0 bg-white border-t-2 items-center justify-around shadow-sm flex md:hidden">
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
        <Link href={"/announcement"}>
        {(()=>{
            if(pathname=="/announcement"){
                return <PiSpeakerLowFill  className="text-2xl"/>
            }
            else{
                return <PiSpeakerLowDuotone  className="text-2xl"/>
            }
        })()}
        </Link>
        <Link href={"/liked"}>
        {(()=>{
            if(pathname=="/liked"){
                return <BiSolidLike  className="text-2xl" />
            }
            else{
                return <BiLike  className="text-2xl" />
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