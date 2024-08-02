"use server"

import prisma from "@/db"

export async function ProfileById(userid:string){
    try {
        const response = await prisma.user.findUnique({
            where:{
                id:userid
            },
            include:{
                _count:{
                    select:{
                        video:true,
                        annoucement:true
                    },
                },
                video:{

                },
                annoucement:{
                    
                }
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}