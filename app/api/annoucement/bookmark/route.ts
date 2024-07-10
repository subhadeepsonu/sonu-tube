import { NextRequest, NextResponse } from "next/server";
import { announcementBookmarkSchema } from "./schema";
import z from "zod"
import prisma from "@/db";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof announcementBookmarkSchema> = await req.json()
        const check = announcementBookmarkSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.annoucementbookmark.create({
            data:{
                annoucementid:data.announcementid,
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
        const data:z.infer<typeof announcementBookmarkSchema> = await req.json()
        const check = announcementBookmarkSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.annoucementbookmark.deleteMany({
            where:{
                annoucementid:data.announcementid,
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