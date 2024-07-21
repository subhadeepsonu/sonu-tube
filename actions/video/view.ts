"use server"
import prisma from "@/db"
import { revalidatePath } from "next/cache";
export async  function views(userid:string,videoid:number){
    try {
        const date = new Date();
        const response = await prisma.views.findMany({
            where:{
                userid:userid,
                videoid:videoid
            }
        })
        if(response.length>0){
            const update = await prisma.views.updateMany({
                where:{
                    userid:userid,
                    videoid:videoid
                },
                data:{
                    updatedat:date.getTime().toString()
                }
            })
            console.log(update)
            revalidatePath("/history")
            return update
        }else{
            const create = await prisma.views.create({
                data:{
                    userid:userid,
                    videoid:videoid,
                    updatedat:date.getTime().toString()
                }
            })
            revalidatePath("/history")
            console.log(create)
            return create
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}