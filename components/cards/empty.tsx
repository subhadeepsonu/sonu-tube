"use client"
import Lottie from "lottie-react"
import empty from "@/public/empty.json"
export default function EmptyCard(){
    return <div className="h-96 w-96">
        <Lottie animationData={empty}></Lottie>
    </div>
}