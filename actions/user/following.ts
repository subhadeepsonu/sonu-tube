"use server"

import prisma from "@/db"

export async function Followingchannels(userId:string){
    try {
        const response = await prisma.follows.findMany({
            where:{
                follwerId:userId
            },
            include:{
                user:{
                    
                }
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}