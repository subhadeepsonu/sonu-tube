import { NextRequest, NextResponse } from "next/server";
import { schema } from "./schema";
import prisma from "@/db";

export async function POST(req: NextRequest) {
    try {
        const check = schema.safeParse(req.body)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.user.findUnique({
            where: {
                id: check.data.id
            },
            include: {
                _count: {
                    select: {
                        video: true,
                        annoucement: true,
                        follows: true
                    },
                },
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
                follows: {

                },

                annoucement: {
                    include: {
                        user: {

                        },
                        _count: {
                            select: {
                                annoucementlike: true,
                                annoucementdislike: true
                            }
                        },
                        annoucementlike: {

                        },
                        annoucementdislike: {

                        },
                        annoucementbookmark: {

                        }
                    }
                }
            }
        })
        return NextResponse.json({
            success: true,
            data: response
        })
    } catch (error) {
        NextResponse.json({
            success: false,
            message: `${error}`
        })
    }

}