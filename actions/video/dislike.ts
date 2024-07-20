"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function AddDisLikeVideo(userid:string,videoid:number){
    try {
        const isLiked = await prisma.like.findMany({
            where:{
                userId:userid,
                videoId:videoid
            }
        })
        if(isLiked){
            const remove = await prisma.like.deleteMany({
                where:{
                    userId:userid,
                    videoId:videoid
                }
            })
            const response = await prisma.dislike.create({
                data:{
                    userId:userid,
                    videoId:videoid
                }
            })
            revalidatePath("/video/[id]")
            revalidatePath("/liked")
            return response
        }else{
            const response = await prisma.dislike.create({
                data:{
                    userId:userid,
                    videoId:videoid
                }
            })
            revalidatePath("/video/[id]")
            revalidatePath("/liked")
            return response
        }
    } catch (error) {
        throw  new Error(`${error}`)
    }
}
export async function RemoveDisLikeVideo(userid:string,videoid:number){
    try {
        const response = await prisma.dislike.deleteMany({
            where:{
                userId:userid,
                videoId:videoid
            }
        })
        revalidatePath("/video/[id]")
        revalidatePath("/liked")
        return response
    } catch (error) {
        throw  new Error(`${error}`)
    }
}