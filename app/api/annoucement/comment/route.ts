import { NextRequest, NextResponse } from "next/server";
import { annoucementCommentSchema } from "./schema";
import z from "zod"
import prisma from "@/db";
import { revalidatePath } from "next/cache";
export async function GET(req: NextRequest) {
    try {
        const query = req.nextUrl.searchParams
        if (!query.has('id')) {
            return NextResponse.json({
                success: false,
                message: "Please provide an id"
            })
        }
        const response = await prisma.announcementcomment.findMany({
            where: {
                announcementid: Number(query.get('id'))
            },
            include: {
                user: {
                    select: {
                        name: true,
                        imgurl: true
                    }
                }
            },
            orderBy: {
                id: 'desc'
            }
        })
        return NextResponse.json({
            success: true,
            data: response
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}
export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get('x-user-id')
        const data: z.infer<typeof annoucementCommentSchema> = await req.json()
        const check = annoucementCommentSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.announcementcomment.create({
            data: {
                comment: data.comment,
                announcementid: data.announcementid,
                userid: userId!
            }
        })
        return NextResponse.json({
            success: true,
            message: "Comment added successfully",
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}
