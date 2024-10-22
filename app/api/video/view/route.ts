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
                updatedat: "desc"
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
        const data: z.infer<typeof viewSchema> = await req.json()
        const check = viewSchema.safeParse(viewSchema)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.views.create({
            data: {
                userid: data.userid,
                videoid: data.videoid
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