import prisma from "@/db"

export async function GetUserVideoById(id:string){
    try {
        const response = await prisma.video.findMany({
            where:{
                userid:id
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}