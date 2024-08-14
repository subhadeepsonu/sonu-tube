import Link from "next/link";

export default function CatTag(props:{
    href:string,
    name:string 
}){
    return <Link href={`/explore/${props.href}`} className="px-2 dark:border-zinc-900 dark:border-2  dark:text-gray-100 dark:bg-black my-2 bg-white mx-2 py-1 rounded-md shadow-sm">
        {props.name}
    </Link>
}