"use server"

import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function GetVideoById(id:number){
    try {
        const response = await prisma.video.findUnique({
            where:{
                id:id
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}