import prisma from "@/db"
export async function GetAllAnnouncements(){
    try {
        const response = await prisma.annoucement.findMany({
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
        return response
    } catch (error) {
        throw new  Error(`${error}`)
    }
}