"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function GetComments(announcementid:number){
    try {
        const response = await prisma.announcementcomment.findMany({
            where:{
                announcementid:announcementid
            },
            include:{
                user:{

                }
            },
            orderBy:{
                id:"desc"
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}
export async function AnnouncementPostComment(userid:string,announcementid:number,comment:string){
    try {
        const response = await prisma.announcementcomment.create({
            data:{
                comment:comment,
                userid:userid,
                announcementid:announcementid
            }
        })
        revalidatePath("/announcement")
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}