import { NextRequest, NextResponse } from "next/server";
import { announcementBookmarkSchema } from "./schema";
import z from "zod"
import prisma from "@/db";
import { revalidatePath } from "next/cache";
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const response = await prisma.annoucementbookmark.findMany({
            where: {
                userid: userId!
            },
            include: {
                annoucement: {
                    include: {
                        annoucementlike: {
                            where: {
                                userid: userId!
                            }
                        },
                        annoucementdislike: {
                            where: {
                                userid: userId!
                            }
                        },
                        _count: {
                            select: {
                                annoucementlike: true,
                                annoucementdislike: true
                            }
                        }
                    },

                }
            }
        })
        const UpdatedResponse = response.map((announcement) => {
            return {
                id: announcement.id,
                title: announcement.annoucement.title,
                description: announcement.annoucement.discription,
                likes: announcement.annoucement._count.annoucementlike,
                dislikes: announcement.annoucement._count.annoucementdislike,
                createdAt: announcement.annoucement.createdat,
                BookMarked: true,
                Liked: announcement.annoucement.annoucementlike.length > 0,
                Disliked: announcement.annoucement.annoucementdislike.length > 0

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
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof announcementBookmarkSchema> = await req.json()
        const check = announcementBookmarkSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        const find = await prisma.annoucementbookmark.findMany({
            where: {
                annoucementid: data.announcementid,
                userid: userId!
            }
        })
        if (find.length > 0) {
            return NextResponse.json({
                success: false,
                message: "Already Bookmarked"
            })
        }
        await prisma.annoucementbookmark.create({
            data: {
                annoucementid: data.announcementid,
                userid: userId!
            }
        })
        revalidatePath("/more/bookmark")
        revalidatePath("/announcement")
        return NextResponse.json({
            success: true,
            message: "Bookmarked"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof announcementBookmarkSchema> = await req.json()
        const check = announcementBookmarkSchema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.annoucementbookmark.deleteMany({
            where: {
                annoucementid: data.announcementid,
                userid: userId!
            }
        })
        revalidatePath("/more/bookmark")
        revalidatePath("/announcement")
        return NextResponse.json({
            success: true,
            message: "Bookmark Removed"
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}