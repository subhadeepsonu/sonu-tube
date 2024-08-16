"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function DeleteAnnouncement(id:number){
    try {
        const response = await prisma.annoucement.delete({
            where:{
                id:id
            }
        })
        revalidatePath("/profile")
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}