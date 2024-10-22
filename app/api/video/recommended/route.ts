import prisma from "@/db";
import { NextRequest, NextResponse } from "next/server";
import { recommendationSchema } from "./schema";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        const check = recommendationSchema.safeParse(body)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error.message}`
            });
        }
        const response = await prisma.video.findMany({
            where: {
                tag: check.data.tag as any,
                NOT: {
                    id: check.data.currentid
                }
            },
            include: {
                _count: {
                    select: {
                        views: true
                    }
                },
                user: {
                    include: {

                    }
                },
                watchlater: {

                }
            },
            orderBy: {
                createdat: "desc"
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
        });
    }
}