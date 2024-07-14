import { NextRequest, NextResponse } from "next/server";
import { annoucementLikeSchema } from "./schema";
import z from "zod"
import prisma from "@/db";
import { revalidatePath } from "next/cache";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof annoucementLikeSchema> = await req.json()
        const check = annoucementLikeSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const Isdislike = await prisma.annoucementdislike.findMany({
            where:{
                annoucementid:data.announcementid,
                userid:data.userid
            }
        })
        if(Isdislike){
            await prisma.annoucementdislike.deleteMany({
                where:{
                    annoucementid:data.announcementid,
                    userid:data.userid
                }
            })
            const response = await prisma.annoucementlike.create({
                data:{
                    annoucementid:data.announcementid,
                    userid:data.userid
                }
            })
            revalidatePath('/announcement')
            return NextResponse.json({
                success:true,
                message:response
            })
        }
        const response = await prisma.annoucementlike.create({
            data:{
                annoucementid:data.announcementid,
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

export async function DELETE(req:NextRequest){
    try {
        const data:z.infer<typeof annoucementLikeSchema> = await req.json()
        const check = annoucementLikeSchema.safeParse(data)
        console.log(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.annoucementlike.deleteMany({
            where:{
                userid:data.userid,
                annoucementid:data.announcementid
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