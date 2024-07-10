import { NextRequest, NextResponse } from "next/server";
import  z from "zod"
import { commentSchema } from "./schema";
import prisma from "@/db";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof commentSchema> =  await req.json()
        const check = commentSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.comment.create({
            data:{
                comment:data.comment,
                userId:data.userid,
                videoId:data.videoid
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