"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache";
export async function EditAnnouncementAction(title:string,discription:string,id:number){
    try {
        const response =  await prisma.annoucement.update({
            where:{
                id:id
            },
            data:{
                title:title,
                discription:discription
            }   
        })
        revalidatePath("/profile")
        return response;
    } catch (error) {
        throw new Error(`${error}`)
    }
}