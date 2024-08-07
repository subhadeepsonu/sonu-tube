"use server"
import prisma from "@/db"
import { jwtDecode } from "jwt-decode"
import { revalidatePath } from "next/cache"
import { cookies } from "next/headers"
export async function AddVideo(title:string,discription:string,videourl:string,thumbnailurl:string,tag:any){
    try {
        const token = cookies().get('token')
        const decoded:any = jwtDecode(token?.value!)
        const response = await prisma.video.create({
            data:{
                title:title,
                discription:discription,
                thumnailurl:thumbnailurl,
                videourl:videourl,
                userid:decoded.id,
                tag:tag
            }
        })
        revalidatePath("/")
        revalidatePath("/more/video")
        console.log(response)
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}