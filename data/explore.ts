"use server"
import prisma from "@/db"

export async function ExploreVideos(){
    try {
        const response = await prisma.video.findMany({
            take:10,
            orderBy:{
                views:{
                    _count:"desc"
                }
            },
            include:{
                user:{
                    
                },
                _count:{
                    select:{
                        views:true
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