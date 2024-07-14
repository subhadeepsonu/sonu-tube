"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function PostLike(aid:number,uid:string){
    try {
        const response = await prisma.annoucementlike.create({
            data:{
                annoucementid:aid,
                userid:uid
            }
        })
        revalidatePath('/text')
        console.log(response)
        return response
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}