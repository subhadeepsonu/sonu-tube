import { NextRequest, NextResponse } from "next/server";
import { followschema } from "./schema";
import z from "zod"
import prisma from "@/db";
export async function GET(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")!
        const response = await prisma.follows.findMany({
            where: {
                follwerId: userId
            },
            include: {
                user: true
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
export async function POST(req: NextRequest) {
    try {
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof followschema> = await req.json()
        const check = followschema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.follows.create({
            data: {
                follwerId: userId!,
                userId: data.followerid
            }
        })
        return NextResponse.json({
            success: true,
            message: "followed"
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
        const userId = req.headers.get("x-user-id")
        const data: z.infer<typeof followschema> = await req.json()
        const check = followschema.safeParse(data)
        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: `${check.error}`
            })
        }
        await prisma.follows.deleteMany({
            where: {
                follwerId: userId!,
                userId: data.followerid
            }
        })
        return NextResponse.json({
            success: true,
            message: "unfollowed"
        })
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: `${error}`
        })
    }
}