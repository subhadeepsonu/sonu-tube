import prisma from "@/db"

export async function GetWatchLaterById(id:string){
    try {
        const response = await prisma.watchlater.findMany({
            where:{
                userId:id
            },
            include:{
                video:{
                    include:{
                        _count:{
                            select:{
                                views:true
                            }
                        }
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