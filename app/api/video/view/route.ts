import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { viewSchema } from "./schema";
import prisma from "@/db";
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const response = await prisma.views.findMany({
            where: {
                userid: userId!
            },
            orderBy: {
                viewedat: "desc"
            },
            include: {
                video: {

                    include: {
                        user: {

                        },
                        _count: {
                            select: {
                                views: true
                            }
                        },
                        watchlater: {

                        }
                    }
                },

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
        const data: z.infer<typeof viewSchema> = await req.json()
        console.log(data)
        const check = viewSchema.safeParse(data)
        if (!check.success) {
            console.log(check.error)
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.views.findFirst({
            where: {
                userid: userId!,
                videoid: data.videoid
            }
        })
        if (response) {
            await prisma.views.deleteMany({
                where: {
                    userid: userId!,
                    videoid: data.videoid
                }
            })
            await prisma.views.create({
                data: {
                    userid: userId!,
                    videoid: data.videoid
                }
            })

            return NextResponse.json({
                success: true,
                message: "Viewed updated"
            })
        }
        else {
            await prisma.views.create({
                data: {
                    userid: userId!,
                    videoid: data.videoid
                }
            })
            return NextResponse.json({
                success: true,
                message: "Viewed"
            })
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}