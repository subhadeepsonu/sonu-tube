import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { announcementDeleteSchema, announcementSchema } from "./schema";
import prisma from "@/db";
import { revalidatePath } from "next/cache";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof announcementSchema> = await req.json()
        const check = announcementSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        revalidatePath('/announcement')
        const response = await prisma.annoucement.create({
            data:{
                discription:data.discription,
                title:data.title,
                userid:data.userid
            }
        })
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

export async function DELETE(req:NextRequest){
    try {
        const data:z.infer<typeof announcementDeleteSchema> = await req.json()
        const check = announcementDeleteSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.annoucement.delete({
            where:{
                id:data.id
            }
        })
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