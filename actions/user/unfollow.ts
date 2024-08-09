"use server"

import prisma from "@/db"
import { revalidatePath } from "next/cache";

export async function Unfollow(userid:string,channelid:string){
    try {
        const response = await prisma.follows.deleteMany({
            where:{
                follwerId:userid,
                userId:channelid
            }
        })
        revalidatePath("/video/path*")
        return response ;

    } catch (error) {
        throw new Error(`${error}`)
    }
}