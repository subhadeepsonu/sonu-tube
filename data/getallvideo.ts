"use server"
import prisma from "@/db"
export default async function GetAllVideos(){
    try {
        const response = await prisma.video.findMany({
            orderBy:{
                createdat:"desc"
            },
            where:{
                publish:true
            },include:{
                user:{
                    select:{
                        name:true,
                        imgurl:true,
                        id:true
                    }
                },
                _count:{
                    select:{
                        views:{
                            
                        }
                    }
                },
                watchlater:{
                    
                }
            }
        })
        
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}