"use client"
import Link from "next/link"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import Cookies from "universal-cookie";
import { usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import { ModeToggle } from "./modetoggle";
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
    return <div className="h-16 w-screen dark:bg-zinc-950  dark:text-white z-20 fixed   text-black backdrop-blur-sm bg-white flex justify-between px-4 items-center top-0  ">
        <Link href={"/"} className="text-2xl font-bold flex justify-start items-center w-40">
        sonutube
        </Link>
        <div className="w-1/2 flex">
        </div>
        <div className="flex  justify-around w-32  items-center h-20 pr-2">
            <ModeToggle></ModeToggle>
            <DropdownMenu>
                <DropdownMenuTrigger>
                <img src={decoded.imgurl} className="h-12 w-12 rounded-full object-cover "></img>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={"/profile"}>
                    <DropdownMenuItem className="flex justify-center items-center font-medium">Profile</DropdownMenuItem>
                    </Link>
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