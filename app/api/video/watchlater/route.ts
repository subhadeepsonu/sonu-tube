import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { watchlaterDeleteSchema, watchlaterSchema } from "./schema";
import prisma from "@/db";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof watchlaterSchema> = await req.json()
        const check = watchlaterSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.watchlater.create({
            data:{
                userId:data.userId,
                vedioId:data.videoId
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
        const data:z.infer<typeof watchlaterDeleteSchema> = await req.json()
        const check = watchlaterDeleteSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.watchlater.delete({
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