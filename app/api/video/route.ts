import { NextRequest, NextResponse } from "next/server";
import { videoDeleteSchema, videoSchema } from "./schema";
import prisma from "@/db";
import z from "zod"

export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get('x-user-id');
        const response = await prisma.video.findMany({
            orderBy: {
                createdat: "desc"
            },
            where: {
                publish: true
            }, include: {
                user: {
                    select: {
                        name: true,
                        imgurl: true,
                        id: true
                    }
                },
                _count: {
                    select: {
                        views: {

                        }
                    }
                },
                watchlater: {
                    where: {
                        userId: userId!
                    }
                }
            }
        })
        const count = await prisma.video.count()
        const updatedResponse = response.map((video) => ({
            ...video,
            MarkedAsWatchLater: video.watchlater.length > 0
        }))
        return NextResponse.json({
            data: updatedResponse,
            count: count
        })
    } catch (error: any) {
        return NextResponse.json({
            success: false,
            message: error.message || "something went wrong"
        })
    }
}
export async function POST(req: NextRequest) {
    try {
        const data: z.infer<typeof videoSchema> = await req.json()
        const check = videoSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const userId = req.headers.get('x-user-id');
        const response = await prisma.video.create({
            data: {
                title: data.title,
                discription: data.discription,
                thumnailurl: data.thumbnail,
                videourl: data.video,
                userid: userId!,
                tag: data.tag as any
            }
        })
        return NextResponse.json({
            success: true,
            message: response
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const data: z.infer<typeof videoDeleteSchema> = await req.json()
        const check = videoDeleteSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.video.delete({
            where: {
                id: data.id
            }
        })
        return NextResponse.json({
            success: true,
            message: response
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}