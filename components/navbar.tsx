"use client"
import Link from "next/link"
import { Button } from "./ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
  
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { toast } from "sonner";
export default function Navbar(){
    const router = useRouter()
    const pathname = usePathname()
    if(pathname=="/auth"){
        return null
    }
    else{
        const cookie = new Cookies()
        const token = cookie.get('token')
        if(token){
            const decoded:any = jwtDecode(cookie.get('token'))
    return <div className="h-16 w-screen z-20 fixed shadow-sm  text-black backdrop-blur-sm bg-white flex justify-between px-4 items-center top-0  ">
        <Link href={"/"} className="text-2xl font-bold">SonuTube</Link>
        <div className="w-1/2 flex">
        </div>
        <div className="flex  justify-center items-center h-20 pr-2">
            <DropdownMenu>
                <DropdownMenuTrigger>
                <img src={decoded.imgurl} className="h-12 w-12 rounded-full object-cover "></img>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuItem className="flex justify-center items-center font-medium" onClick={()=>{
                        toast.warning("Still working on it")
                    }}>Profile</DropdownMenuItem>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuItem className="bg-red-500 text-white flex justify-center items-center"  onClick={()=>{
                             
                             cookie.remove('token')
                             
                             router.refresh()  
                             router.push("/auth")}}>
                   
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
        </div>
        }
        else{
            return null;
        }
        
  
        
        
    }
}