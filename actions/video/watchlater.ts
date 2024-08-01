"use server"

import prisma from "@/db"
import { jwtDecode } from "jwt-decode"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"

export async function AddWatchlater(videoid:number){
    try {
        const token = cookies().get('token')
        const decoded:any = jwtDecode(token?.value!)
        const response = prisma.watchlater.create({
            data:{
                userId:decoded.id,
                vedioId:videoid
            }
        })
        revalidatePath("/")
        revalidatePath("/liked")
        revalidatePath("/history")
        revalidatePath("/more/watchlater")
        revalidatePath("/more/video")
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
   
}
export async function RemoveWatchLater(videoid:number){
    try {
        const token = cookies().get('token')
    const decoded:any = jwtDecode(token?.value!)
    const response = prisma.watchlater.deleteMany({
        where:{
            userId:decoded.id,
            vedioId:videoid
        }
    })
    revalidatePath("/")
    revalidatePath("/liked")
    revalidatePath("/history")
    revalidatePath("/more/watchlater")
    revalidatePath("/more/video")
    return response
    } catch (error) {
        throw new Error(`${error}`)
    }
    
}