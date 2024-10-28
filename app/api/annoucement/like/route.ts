"use server"
import { NextRequest, NextResponse } from "next/server";
import { annoucementLikeSchema } from "./schema";
import z from "zod"
import prisma from "@/db";
import { revalidatePath } from "next/cache";
export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof annoucementLikeSchema> = await req.json()
        const check = annoucementLikeSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const Isdislike = await prisma.annoucementdislike.findMany({
            where: {
                annoucementid: data.announcementid,
                userid: userId!
            }
        })
        if (Isdislike) {
            await prisma.annoucementdislike.deleteMany({
                where: {
                    annoucementid: data.announcementid,
                    userid: userId!
                }
            })
            const response = await prisma.annoucementlike.create({
                data: {
                    annoucementid: data.announcementid,
                    userid: data.userid
                }
            })
            return NextResponse.json({
                success: true,
                message: response
            })
        }
        const response = await prisma.annoucementlike.create({
            data: {
                annoucementid: data.announcementid,
                userid: userId!
            }
        })

        return NextResponse.json({
            success: true,
            message: "liked"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof annoucementLikeSchema> = await req.json()
        const check = annoucementLikeSchema.safeParse(data)
        console.log(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.annoucementlike.deleteMany({
            where: {
                userid: userId!,
                annoucementid: data.announcementid
            }
        })
        return NextResponse.json({
            success: true,
            message: "unliked"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}