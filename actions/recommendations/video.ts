"use server"
import prisma from "@/db"
export async function GetvideoBytag(tag:any){
    try {
        const response  = await prisma.video.findMany({
            where:{
                tag:tag
            },
            include:{
                _count:{
                    select:{
                        views:true
                    }
                },
                user:{
                    include:{
                        
                    }
                }
            },
            orderBy:{
                createdat:"desc"
               }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}