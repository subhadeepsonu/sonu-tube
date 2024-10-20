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
import { ModeToggle } from "./modetoggle";
import { Input } from "./ui/input";
export default function Navbar() {
    const router = useRouter()
    const cookie = new Cookies()
    const pathname = usePathname()
    if (pathname == "/login" || pathname == "/signup") {
        return null
    }
    return <div className="h-12 w-screen dark:backdrop-blur-sm dark:bg-black border-b-2 shadow-sm  dark:text-white z-20 fixed   text-black backdrop-blur-sm bg-white flex justify-between px-4 items-center top-0  ">
        <Link href={"/"} className="text-2xl font-bold flex justify-start items-center w-40">
            sonutube
        </Link>
        <div className="w-1/2 flex bg-red">
            <Input placeholder="Search" className="w-full dark:focus:border-gray-800"></Input>
        </div>
        <div className="flex  justify-around w-32  items-center h-12 pr-2">
            <ModeToggle></ModeToggle>
            <DropdownMenu>
                <DropdownMenuTrigger>
                    <img src={""} className="h-12 w-12 rounded-full object-cover "></img>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <Link href={"/profile"}>
                        <DropdownMenuItem className="flex justify-center items-center font-medium">Profile</DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator></DropdownMenuSeparator>
                    <DropdownMenuItem className="bg-red-500 text-white flex justify-center items-center" onClick={() => {
                        cookie.remove('token')
                        router.refresh()
                        router.push("/login")
                    }}>
                        Logout
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    </div>
}
