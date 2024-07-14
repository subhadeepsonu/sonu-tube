import { NextRequest, NextResponse } from "next/server";
import { annoucementDislikeSchema } from "./schema";
import z from "zod"
import prisma from "@/db";

export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof annoucementDislikeSchema> = await req.json()
        const check = annoucementDislikeSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const isLiked = await prisma.annoucementlike.findMany({
            where:{
                annoucementid:data.announcementid,
                userid:data.userid
            }
        })
        if(isLiked){
            await prisma.annoucementlike.deleteMany({
                where:{
                    annoucementid:data.announcementid,
                    userid:data.userid
                }
            })
            const response = await prisma.annoucementdislike.create({
                data:{
                    annoucementid:data.announcementid,
                    userid:data.userid
                }
            })
            return NextResponse.json({
                success:true,
                message:response
            })
        }
        const response = await prisma.annoucementdislike.create({
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
        const data:z.infer<typeof annoucementDislikeSchema> = await req.json()
        const check = annoucementDislikeSchema.safeParse(data)
        console.log(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.annoucementdislike.deleteMany({
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