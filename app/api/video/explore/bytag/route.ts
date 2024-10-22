import { NextRequest, NextResponse } from "next/server";
import { byTagSchema } from "./schema";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body)
        const check = byTagSchema.safeParse(body)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: check.error
            })
        }
        const userId = req.headers.get('x-user-id');
        const response = await prisma.video.findMany({
            orderBy: {
                createdat: "desc"
            },
            where: {
                publish: true,
                tag: check.data.tag as any
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

        const updatedResponse = response.map((video) => ({
            ...video,
            MarkedAsWatchLater: video.watchlater.length > 0
        }))
        return NextResponse.json({
            success: true,
            data: updatedResponse
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "something went wrong"
        })
    }
}