import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { videoLikeSchema } from "./schema";
import prisma from "@/db";
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const response = await prisma.like.findMany({
            where: {
                userId: userId!
            },
            include: {
                video: {
                    include: {
                        user: {

                        },
                        _count: {
                            select: {
                                views: {

                                },
                            }
                        },
                        watchlater: {

                        }
                    },

                },
            },
            orderBy: {
                createdAt: "desc"
            }
        })
        return NextResponse.json({
            success: true,
            data: response
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })

    }
}
export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof videoLikeSchema> = await req.json()
        const check = videoLikeSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const Isdislike = await prisma.dislike.findMany({
            where: {
                userId: userId!,
                videoId: data.videoid
            }
        })
        if (Isdislike) {
            await prisma.dislike.deleteMany({
                where: {
                    userId: userId!,
                    videoId: data.videoid
                }
            })
            const resp = await prisma.like.create({
                data: {
                    userId: userId!,
                    videoId: data.videoid
                }
            })
            return NextResponse.json({
                success: true,
                message: resp
            })
        }
        await prisma.like.create({
            data: {
                userId: userId!,
                videoId: data.videoid
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
        const data: z.infer<typeof videoLikeSchema> = await req.json()
        const check = videoLikeSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.like.deleteMany({
            where: {
                userId: userId!,
                videoId: data.videoid
            }
        })
        return NextResponse.json({
            success: true,
            message: "like removed"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}