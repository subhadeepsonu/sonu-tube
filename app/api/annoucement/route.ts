import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { annoucementDeleteSchema, annoucementSchema } from "./schema";
import prisma from "@/db";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof annoucementSchema> = await req.json()
        const check = annoucementSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
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
        const data:z.infer<typeof annoucementDeleteSchema> = await req.json()
        const check = annoucementDeleteSchema.safeParse(data)
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