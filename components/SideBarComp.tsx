"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

export default function SideBarComp(props: {
    pathname: string
    href: string
    Icon: any
}) {
    const [active, setActive] = useState(false)
    const path = usePathname()
    useEffect(() => {
        if (path == props.href) {
            console.log(path)
            setActive(true)
        }
        else {
            setActive(false)
        }
    }, [path])
    return <Link className="w-full  px-1 my-2" href={`${props.href}`}><div className={`rounded-lg  ${(active) ? "dark:bg-white dark:text-black bg-black text-white" : "dark:bg-black hover:bg-black/60 hover:text-white dark:hover:bg-white/70 dark:hover:text-black  "} flex justify-start  px-5 items-center h-14 transition-all `}>
        <div>{props.Icon} </div> <p className="pl-2">{props.pathname}</p>
    </div>
    </Link>
}