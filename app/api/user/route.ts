import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { userSchema } from "./schema";
import prisma from "@/db";
export async function GET(req: NextRequest) {
    try {
        const userid = req.headers.get("x-user-id")
        const response = await prisma.user.findUnique({
            where: {
                id: userid!
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
export async function POST(req: NextRequest) {
    try {
        const data: z.infer<typeof userSchema> = await req.json()
        const check = userSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.user.findUnique({
            where: {
                id: data.id
            },
            include: {
                video: {
                    include: {
                        _count: {
                            select: {
                                comment: {

                                },
                                dislike: {

                                },
                                views: {

                                },
                                like: {

                                },
                                watchlater: {

                                }
                            }
                        }
                    },

                }
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
