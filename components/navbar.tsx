import Link from "next/link";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

export default function Navbar(){
    return <div className="h-16 w-screen z-20 fixed shadow-sm  text-black border-b-2 border-gray-100 backdrop-blur-sm bg-white flex justify-between px-4 items-center top-0  ">
        <Link href={"/"} className="text-2xl font-bold">SonuTube</Link>
        <div className="w-1/2 flex">
        <Input placeholder="seacrh" className="w-full rounded-full"></Input>
        
        </div>
        <Link href={"/auth"}>
        <Button>Login</Button>
        </Link>
        </div>
}