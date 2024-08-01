"use client"
import Link from "next/link"
import { Button } from "./ui/button";
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
export default function Navbar(){
    const router = useRouter()
    const pathname = usePathname()
    if(pathname=="/auth"){
        return null
    }
    return <div className="h-16 w-screen z-20 fixed shadow-sm  text-black backdrop-blur-sm bg-white flex justify-between px-4 items-center top-0  ">
        <Link href={"/"} className="text-2xl font-bold">SonuTube</Link>
        <div className="w-1/2 flex">
        </div>
        
        <Button onClick={()=>{
            const cookie = new Cookies()
            cookie.remove('token')
            router.refresh()  
            router.push("/auth")
        }}>Log Out</Button>
        
        </div>
}