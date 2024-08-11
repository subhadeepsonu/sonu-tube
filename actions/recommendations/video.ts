"use server"
import prisma from "@/db"
export async function GetvideoBytag(tag:any,currentid:number){
    try {
        const response  = await prisma.video.findMany({
            where:{
                tag:tag,
                NOT:{
                    id:currentid
                }
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
                },
                watchlater:{
                    
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