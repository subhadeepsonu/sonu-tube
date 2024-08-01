"use server"
import prisma from "@/db"
export async function GetHistory(userid:string){
    try {
        const response = await prisma.views.findMany({
            where:{
                userid:userid
            },
            orderBy:{
                updatedat:"desc"
            },
            include:{
                video:{
                   
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
                },
                
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}