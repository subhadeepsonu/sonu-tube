import { NextRequest, NextResponse } from "next/server";
import { videoDeleteSchema, videoSchema } from "./schema";
import prisma from "@/db";
import z from "zod"
export  async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof videoSchema> = await req.json()
        const check = videoSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.video.create({
            data:{
                title:data.title,
                discription:data.discription,
                thumnailurl:data.thumbnail,
                videourl:data.video,
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
        const data:z.infer<typeof videoDeleteSchema> = await req.json()
        const check = videoDeleteSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.video.delete({
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