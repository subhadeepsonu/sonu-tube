import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { videoLikeSchema } from "./schema";
import prisma from "@/db";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof videoLikeSchema> = await req.json()
        const check = videoLikeSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const Isdislike = await prisma.dislike.findMany({
            where:{
                userId:data.userid,
                videoId:data.videoid
            }
        })
        if(Isdislike){
            await prisma.dislike.deleteMany({
                where:{
                    userId:data.userid,
                    videoId:data.videoid
                }
            })
            const resp = await prisma.like.create({
                data:{
                    userId:data.userid,
                    videoId:data.videoid
                }
            })
            return NextResponse.json({
                success:true,
                message:resp
            })
        }
        const resp2 = await prisma.like.create({
            data:{
                userId:data.userid,
                videoId:data.videoid
            }
        })
        return NextResponse.json({
            success:true,
            message:resp2
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
        const data:z.infer<typeof videoLikeSchema> = await req.json()
        const check = videoLikeSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await  prisma.like.deleteMany({
            where:{
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