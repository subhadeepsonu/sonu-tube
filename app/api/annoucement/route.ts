import { NextRequest, NextResponse } from "next/server";
import z from "zod"
import { announcementDeleteSchema, announcementSchema } from "./schema";
import prisma from "@/db";
export async function GET(req: NextRequest) {
    try {
        const url = new URL(req.url)
        const params = url.searchParams
        const userId = req.headers.get("x-user-id")!
        // if (!params.get("limit") || !params.get("offset")) {
        //     return NextResponse.json({
        //         success: false,
        //         message: "Limit or off set not given"
        //     })
        // }
        const response = await prisma.annoucement.findMany({
            include: {
                _count: {
                    select: {
                        annoucementlike: true,
                        annoucementdislike: true
                    }
                },
                annoucementlike: {
                    where: {
                        userid: userId
                    }
                },
                annoucementdislike: {
                    where: {
                        userid: userId
                    }
                },
                annoucementbookmark: {
                    where: {
                        userid: userId
                    }
                }
            }
        })
        const UpdatedResponse = response.map((annoucement) => {
            return {
                id: annoucement.id,
                likes: annoucement._count.annoucementlike,
                dislikes: annoucement._count.annoucementdislike,
                title: annoucement.title,
                description: annoucement.discription,
                createdAt: annoucement.createdat,
                BookMarked: annoucement.annoucementbookmark.length > 0,
                Liked: annoucement.annoucementlike.length > 0,
                Disliked: annoucement.annoucementdislike.length > 0
            }
        })
        return NextResponse.json({
            success: true,
            data: UpdatedResponse
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
        const data: z.infer<typeof announcementSchema> = await req.json()
        const check = announcementSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.annoucement.create({
            data: {
                discription: data.discription,
                title: data.title,
                userid: data.userid
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

export async function DELETE(req: NextRequest) {
    try {
        const data: z.infer<typeof announcementDeleteSchema> = await req.json()
        const check = announcementDeleteSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const response = await prisma.annoucement.delete({
            where: {
                id: data.id
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