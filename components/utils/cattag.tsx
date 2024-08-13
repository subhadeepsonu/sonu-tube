import Link from "next/link";

export default function CatTag(props:{
    href:string,
    name:string 
}){
    return <Link href={`/explore/${props.href}`} className="px-2 dark:text-white dark:bg-black my-2 bg-white mx-2 py-1 rounded-md shadow-sm">
        {props.name}
    </Link>
}