"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache"
export async function GetAllAnnouncements(){
    try {
        const response = await prisma.annoucement.findMany({
            orderBy:{
                id:"desc"
            },
            include:{
                user:{

                },
                announcementcomment:{
                    include:{
                        
                    }
                },
                _count:{
                    select:{
                        annoucementlike:true,
                        annoucementdislike:true,
                    }
                },
                annoucementlike:{
                    include:{
                        user:{
                            
                        }
                    }
                },
                annoucementdislike:{
                    include:{
                        user:{

                        }
                    }
                }
            }
        })
        revalidatePath('/announcement')
        return response
    } catch (error) {
        throw new  Error(`${error}`)
    }
}