"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function SideBarComp(props:{
    pathname:string
    href:string
    Icon:any
}){
    const [active,setActive] = useState(false)
    const path = usePathname()
    useEffect(()=>{
        if(path==props.href){
            console.log(path)
            setActive(true)
        }
        else{
            setActive(false)
        }
    },[path])
    return <Link className="w-full px-2 my-2" href={`${props.href}`}><div className={`rounded-2xl  ${(active)?"bg-white text-black":"bg-black border-2"} flex justify-start gap-5 px-5 items-center h-14 `}>
      {props.Icon} {props.pathname}
    </div>
    </Link>
}