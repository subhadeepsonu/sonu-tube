"use server"
import prisma from "@/db"
import { jwtDecode } from "jwt-decode"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
export async function AddAnnouncement(title:string,discription:string){
    const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const response = await prisma.annoucement.create({
        data:{
            title:title,
            discription:discription,
            userid:decoded.id
        }
    })
    revalidatePath("/more/annoucement")
    revalidatePath("/announcement")
    return response
}