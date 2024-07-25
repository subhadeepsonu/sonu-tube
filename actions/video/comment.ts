"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function VideoPostComment(comment:string,userid:string,videoid:number){
    try {
        const response = await prisma.comment.create({
            data:{
                comment:comment,
                userId:userid,
                videoId:videoid
            }
        })
        revalidatePath("/video/[id")
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}