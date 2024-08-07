"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function DeleteVideo(id:number){
    try {
        const responce = await prisma.video.delete({
            where:{
                id:id
            }
        })
        revalidatePath("/more/video")
        return responce
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}