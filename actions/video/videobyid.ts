"use server"
import prisma from "@/db"
export async function GetVideoById(id:number){
    try {
        const response = await prisma.video.findUnique({
            where:{
                id:id
            },
            include:{
                _count:{
                    select:{
                        dislike:true,
                        like:true,
                        views:true,
                        
                    }
                },
                dislike:{

                },
                like:{

                },
                user:{
                    include:{
                        _count:{
                            select:{
                                follows:true
                            }
                        },
                        follows:{
                            
                        }
                    },
                },
                comment:{
                    include:{
                        user:{

                        }
                    },
                    orderBy:{
                        id:"desc"
                    }
                }
            },
        })
        
        return response
    } catch (error) {
        console.log(error,"22222")
        throw new Error(`${error}`)
    }
}