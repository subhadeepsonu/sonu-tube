"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function AnnouncementAddLike(userid:string,announcementid:number){
    try {
        const Isdislike = await prisma.annoucementdislike.findMany({
            where:{
                annoucementid:announcementid,
                userid:userid
            }
        })
        if(Isdislike){
            await prisma.annoucementdislike.deleteMany({
                where:{
                    annoucementid:announcementid,
                    userid:userid
                }
            })
            const response = await prisma.annoucementlike.create({
                data:{
                    annoucementid:announcementid,
                    userid:userid
                }
            })
            revalidatePath('/announcement')
            return response
        }
        const response = await prisma.annoucementlike.create({
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
export async function AnnouncementDeletelike(userid:string,announcementid:number){
    try {
        const response = await prisma.annoucementlike.deleteMany({
            where:{
                userid:userid,
                annoucementid:announcementid
            }
        })
        revalidatePath('/announcement')
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}