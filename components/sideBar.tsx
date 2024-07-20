import Link from "next/link";
import { PiTelevisionSimpleBold } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { SlLike } from "react-icons/sl";
import { GoHistory } from "react-icons/go";
import { TfiAnnouncement } from "react-icons/tfi";
import { RxHamburgerMenu } from "react-icons/rx";
export default function SideBar(){
    return <div className="w-24 z-10 h-full fixed left-0  flex justify-start items-start pt-20 border-r-2 bg-white border-gray-100 shadow-sm ">
        <div className="w-full h-5/6 flex-col flex justify-between items-center">
        <Link className="flex justify-center items-center flex-col" href={'/'}>
        <GoHome className="text-2xl" />
        <p className="text-xs">Home</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/liked'}>
        <SlLike className="text-2xl" />
        <p className="text-xs">Liked</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/history'}>
        <GoHistory className="text-2xl" />
        <p className="text-xs">History</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/announcement'}>
        <TfiAnnouncement className="text-2xl" />
        <p className="text-xs">Announments</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/channel'}>
        <PiTelevisionSimpleBold className="text-2xl" />
        <p className="text-xs">Channel</p>
        </Link>
        <Link className="flex justify-center items-center flex-col" href={'/more'}>
        <RxHamburgerMenu className="text-2xl"/>
        <p className="text-xs">More</p>
        </Link>
        </div>
    </div>
}