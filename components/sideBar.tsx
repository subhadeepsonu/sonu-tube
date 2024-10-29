"use client"
import { IoVideocamOutline } from "react-icons/io5";
import { RiFireLine } from "react-icons/ri";
import { AiOutlineProfile } from "react-icons/ai";
import { usePathname } from "next/navigation";
import { IoHomeSharp } from "react-icons/io5";
import { PiSpeakerLowDuotone } from "react-icons/pi";

import SideBarComp from "./SideBarComp";
export default function SideBar() {
    const pathname = usePathname()
    if (pathname.startsWith("/video")) {
        return null
    }
    if (pathname == "/login" || pathname == "/signup") {
        return null
    }
    return <div className="w-52 border-r-2 shadow-sm dark:text-white dark:bg-black h-full hidden md:flex fixed left-0  justify-start items-start pt-12  bg-white   ">
        <div className="w-full   flex-col flex justify-between items-center">
            <SideBarComp pathname="Home" href="/" Icon={<IoHomeSharp className="text-xl" />}></SideBarComp>
            <SideBarComp pathname="Explore" href="/explore" Icon={<RiFireLine className="text-xl" />}></SideBarComp>
            <SideBarComp pathname="Upload" href="/more/uploadvideo" Icon={<IoVideocamOutline className="text-xl" />}></SideBarComp>
            <SideBarComp pathname="Announcements" href="/announcement" Icon={<PiSpeakerLowDuotone className="text-xl" />}></SideBarComp>
            <SideBarComp pathname="Library" href="/more" Icon={<AiOutlineProfile className="text-xl" />}></SideBarComp>

        </div>
    </div>
}