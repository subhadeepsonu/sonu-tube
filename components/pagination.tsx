"use client"
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function PaginationCard(props:{
    page:number,
    total:number,
    
}){
    const router = useRouter()
    const [loading,setLoading] = useState(false)
    const [loading2,setLoading2] = useState(false)
    const searchParams = useSearchParams()
    const totalpages = Math.ceil(props.total/10)
    const [hasNext,SetNext] = useState(true)
    const [hasPrev,SetPrev] = useState(false)
    const params = new URLSearchParams(searchParams)
    useEffect(()=>{
        setLoading(false)
        setLoading2(false)
        if(props.page==1){
            SetPrev(false)
        }
        if(props.page!=1){
            SetPrev(true)
        }
        if(props.page==totalpages){
            SetNext(false)
        }
        if(props.page!==totalpages){
            SetNext(true)
        }
    },[props.page,totalpages])
    const updatePage = (newPage: number) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", `${newPage}`);
        router.push(`?${params.toString()}`);
      };
    return <div className="flex justify-center items-center h-20 w-full ">
        <div className="w-80 flex justify-around items-center ">
        <Button onClick={()=>{
            setLoading(true)
            updatePage(props.page-1)
        }} disabled={!hasPrev || loading}>{(loading)?"loading...":"previous"}</Button>{props.page} out of {totalpages}<Button
        onClick={()=>{
            setLoading2(true)
            updatePage(props.page+1)
        }}
        disabled={!hasNext || loading2}>{(loading2)?"loading..":"next"}</Button>
        </div>
    </div>
}