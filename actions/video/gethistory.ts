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
                    select:{
                        _count:{
                            select:{
                                views:true
                            }
                        },
                        id:true,
                        thumnailurl:true,
                        title:true
                    }
                },
                user:{

                }
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}