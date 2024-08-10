"use server"

import prisma from "@/db"
import { revalidatePath } from "next/cache"

export async function AddFollow(userid:string,channelid:string){
    try {
        const response = await prisma.follows.create({
            data:{
                userId:channelid,
                follwerId:userid
            }
        })
        revalidatePath("/video/path*")
        revalidatePath("/profile/path*")
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}