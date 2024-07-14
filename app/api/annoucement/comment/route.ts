import { NextRequest, NextResponse } from "next/server";
import { annoucementCommentSchema } from "./schema";
import z from "zod"
import prisma from "@/db";
import { revalidatePath } from "next/cache";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof annoucementCommentSchema> = await req.json()
        const check = annoucementCommentSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.announcementcomment.create({
            data:{
                comment:data.comment,
                announcementid:data.announcementid,
                userid:data.userid
            }
        })
        revalidatePath('/announcement')
        return NextResponse.json({
            success:true,
            message:response
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:`${error}`
        })
    }
}
