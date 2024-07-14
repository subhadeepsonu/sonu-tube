"use client"
import { useMutation } from "@tanstack/react-query";
import { Button } from "./ui/button";
import { PostLike } from "@/data/postlike";

export default function TestButton(){
    const MuatateLike = useMutation({
        mutationFn:()=> PostLike(2,"06b5e78e-a887-4b09-ace3-10fdc3654051")
    })
    return <Button onClick={()=>{
        MuatateLike.mutate()
    }}></Button>
}