import { NextRequest, NextResponse } from "next/server";
import { videoDislikeSchema } from "./schema";
import z from "zod"
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof videoDislikeSchema> = await req.json()
        const check = videoDislikeSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const isLiked = await prisma.like.findMany({
            where: {
                userId: userId!,
                videoId: data.videoid
            }
        })
        if (isLiked) {
            await prisma.like.deleteMany({
                where: {
                    userId: userId!,
                    videoId: data.videoid
                }
            })
            const resp2 = await prisma.dislike.create({
                data: {
                    userId: userId!,
                    videoId: data.videoid
                }
            })
            return NextResponse.json({
                success: true,
                message: resp2
            })
        }
        await prisma.dislike.create({
            data: {
                userId: userId!,
                videoId: data.videoid
            }
        })
        return NextResponse.json({
            success: true,
            message: "disliked"
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
        const data: z.infer<typeof videoDislikeSchema> = await req.json()
        const check = videoDislikeSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.dislike.deleteMany({
            where: {
                userId: userId!,
                videoId: data.videoid
            }
        })
        return NextResponse.json({
            success: true,
            message: "dislike removed"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}