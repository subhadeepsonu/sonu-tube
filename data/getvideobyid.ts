import prisma from "@/db"

export async function GetUserVideoById(id:string){
    try {
        const response = await prisma.video.findMany({
            where:{
                userid:id
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