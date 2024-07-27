import prisma from "@/db"

export async function GetAnnouncementById(id:string){
    try {
        const response = await prisma.user.findUnique({
            where:{
                id:id
            },
            include:{
                annoucement:{
                    include:{
                        
                    }
                }
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}