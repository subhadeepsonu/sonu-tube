

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { videoIdSchema } from "./schema";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
        const userId = req.headers.get("x-user-id")
        const check = videoIdSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error.message}`
            })
        }

        const response = await prisma.video.findUnique({
            where: {
                id: check.data.id
            },
            include: {
                _count: {
                    select: {
                        dislike: true,
                        like: true,
                        views: true,

                    }
                },
                dislike: {
                    where: {
                        userId: userId!
                    }
                },
                like: {
                    where: {
                        userId: userId!
                    }
                },
                user: {
                    include: {
                        _count: {
                            select: {
                                follows: true
                            }
                        },
                        follows: {
                            where: {
                                follwerId: userId!
                            }
                        }
                    },
                },
                comment: {
                    include: {
                        user: {
                        }
                    },
                    orderBy: {
                        id: "desc"
                    }
                }
            },
        })
        if (!response) {
            return NextResponse.json({
                success: false,
                message: "Video not found"
            })
        }
        const updatedResponse = {
            ...response,
            liked: response.like.length > 0,
            disliked: response.dislike.length > 0,
            following: response.user.follows.length > 0
        }
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