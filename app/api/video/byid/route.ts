

import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { videoIdSchema } from "./schema";

export async function POST(req: NextRequest) {
    try {
        const data = await req.json()
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
                },
                like: {
                },
                user: {
                    include: {
                        _count: {
                            select: {
                                follows: true
                            }
                        },
                        follows: {

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