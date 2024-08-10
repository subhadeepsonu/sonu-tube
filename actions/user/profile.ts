"use server"

import prisma from "@/db"
import { tree } from "next/dist/build/templates/app-page"

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
                        annoucement:true,
                        follows:true
                    },
                },
                video:{
                   include:{
                    _count:{
                        select:{
                            views:true
                        }
                    },
                    watchlater:{
                        
                    }
                   }
                },
                follows:{

                },
                
                annoucement:{
                    include:{
                        user:{

                        },
                        _count:{
                            select:{
                                annoucementlike:true,
                                annoucementdislike:true
                            }
                        },
                        annoucementlike:{

                        },
                        annoucementdislike:{

                        },
                        annoucementbookmark:{
                            
                        }
                    }
                }
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}