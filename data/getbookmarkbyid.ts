import prisma from "@/db"

export async function GetBookmarkById(id:string){
    try {
        const response = await prisma.annoucementbookmark.findMany({
            where:{
                userid:id
            },
            include:{
                annoucement:{
                    include:{
                        user:{

                        },
                       _count:{
                        select:{
                            annoucementlike:{

                            },
                            annoucementdislike:{
                                
                            }
                        }
                       }
                    }
                },
                user:{
                    include:{
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