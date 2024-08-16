"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function EditVideoAction(id:number,title:string,description:string){
    try {
        const response = await prisma.video.update({
            where:{
                id:id
            },
            data:{
                title:title,
                discription:description
            }
        })
        revalidatePath("/profile")
        return response;
    } catch (error) {
        throw new Error(`${error}`)
    }
}