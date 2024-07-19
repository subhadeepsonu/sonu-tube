"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function AnnouncementAddDislike(userid:string,announcementid:number){
    try {
        const isLiked = await prisma.annoucementlike.findMany({
            where:{
                annoucementid:announcementid,
                userid:userid
            }
        })
        if(isLiked){
            await prisma.annoucementlike.deleteMany({
                where:{
                    annoucementid:announcementid,
                    userid:userid
                }
            })
            const response = await prisma.annoucementdislike.create({
                data:{
                    annoucementid:announcementid,
                    userid:userid
                }
            })
            revalidatePath('/announcement')
            return response
        }
        const response = await prisma.annoucementdislike.create({
            data:{
                annoucementid:announcementid,
                userid:userid
            }
        })
        revalidatePath('/announcement')
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}
export async function AnnouncementDeleteDislike(userid:string,announcementid:number){
    try {
        
        const response = await prisma.annoucementdislike.deleteMany({
            where:{
                annoucementid:announcementid,
                userid:userid
            }
        })
        console.log("ahah")
        revalidatePath('/announcement')
        return response
    } catch (error) {
        console.log(error)
        throw new Error(`${error}`)
    }
}