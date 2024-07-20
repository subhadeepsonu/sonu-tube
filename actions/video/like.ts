"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function AddLikeVideo(userid:string,videoid:number){
    try {
        const isDisLiked = await prisma.dislike.findMany({
            where:{
                userId:userid,
                videoId:videoid
            }
        })
        if(isDisLiked){
            const remove = await prisma.dislike.deleteMany({
                where:{
                    userId:userid,
                    videoId:videoid
                }
            })
            const response = await prisma.like.create({
                data:{
                    userId:userid,
                    videoId:videoid
                }
            })
            revalidatePath("/video/[id]")
            revalidatePath("/liked")
            return response
        }else{
            const response = await prisma.like.create({
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
export async function RemoveLikeVideo(userid:string,videoid:number){
    try {
        const response = await prisma.like.deleteMany({
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