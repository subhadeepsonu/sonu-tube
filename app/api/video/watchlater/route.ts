import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { watchlaterDeleteSchema, watchlaterSchema } from "./schema";
import prisma from "@/db";
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('x-user-id');
        const response = await prisma.watchlater.findMany({
            where: {
                userId: userId!
            },
            include: {
                video: {
                    include: {
                        _count: {
                            select: {
                                views: true
                            }
                        },
                        watchlater: {

                        }
                    }
                },
                user: {

                }
            },
            orderBy: {
                createdat: "desc"
            }
        })
        const updatedResponse = response.map((video) => ({
            ...video,
            id: video.vedioId,
            MarkedAsWatchLater: true
        }))
        return NextResponse.json({
            success: true,
            data: updatedResponse
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
        const userId = req.headers.get('x-user-id');
        const data: z.infer<typeof watchlaterSchema> = await req.json()
        const check = watchlaterSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.watchlater.create({
            data: {
                userId: userId!,
                vedioId: data.id
            }
        })
        return NextResponse.json({
            success: true,
            message: "Added to watchlater"
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
        const userid = req.headers.get('x-user-id');
        const data: z.infer<typeof watchlaterDeleteSchema> = await req.json()
        const check = watchlaterDeleteSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.watchlater.deleteMany({
            where: {
                vedioId: data.id,
                userId: userid!
            }
        })
        return NextResponse.json({
            success: true,
            message: "Removed from watchlater"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}