"use server"
import prisma from "@/db"
export async function GetLikedVideo(userid:string){
    try {
        const response = await prisma.like.findMany({
            where:{
                userId:userid
            },
            include:{
                video:{
                    include:{
                        user:{
                            
                        },
                        _count:{
                            select:{
                                views:{

                                },
                            }
                        },
                        watchlater:{
                            
                        }
                    },

                },
            },
            orderBy:{
                createdAt:"desc"
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}