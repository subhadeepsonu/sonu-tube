"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function GetLikes(){
    try {
        const  response = await prisma.annoucementlike.findMany({
            orderBy:{
                id:"desc"
            }
        })

        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}