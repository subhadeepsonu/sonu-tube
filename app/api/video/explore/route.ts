import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";

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
        const updatedResponse = response.map((video) => ({
            ...video,
            MarkedAsWatchLater: video.watchlater.length > 0
        }))
        return NextResponse.json({
            success: true,
            data: updatedResponse
        })

    } catch (error) {
        NextResponse.json({
            success: false,
            message: `${error}`
        })
    }

}