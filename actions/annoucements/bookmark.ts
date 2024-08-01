"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function AddBookMark(userid:string,annoucementid:number){
try {
    const response = await prisma.annoucementbookmark.create({
        data:{
            annoucementid:annoucementid,
            userid:userid
        }
    })
    revalidatePath("/more/bookmarks")
    revalidatePath('/announcement')
    return response
} catch (error) {
    console.log(`${error}`)
 throw new Error(`${error}`)   
}
}
export async function RemoveBookMark(userid:string,annoucementid:number){
    try {
        const response  = await prisma.annoucementbookmark.deleteMany({
            where:{
                userid:userid,
                annoucementid:annoucementid
            }
        })
        revalidatePath("/more/bookmarks")
        revalidatePath('/announcement')
        return response
    } catch (error) {
        console.log(`${error}`)
        throw new Error(`${error}`)   
    }
}