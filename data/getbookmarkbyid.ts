import prisma from "@/db"

export async function GetBookmarkById(id:string){
    try {
        const response = await prisma.annoucementbookmark.findMany({
            where:{
                userid:id
            },
            include:{
                annoucement:{
                    
                }
            }
        })
        return response
    } catch (error) {
        throw new Error(`${error}`)
    }
}