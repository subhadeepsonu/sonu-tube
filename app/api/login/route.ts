import { NextRequest, NextResponse } from "next/server";
import { loginSchema } from "./schema";
import prisma from "@/db";
import z from "zod"
import bcrypt from "bcryptjs"
import { SignJWT } from "jose"
import { nanoid } from "nanoid"
import { cookies } from "next/headers";
export async function POST(req: NextRequest) {
    try {
        const data: z.infer<typeof loginSchema> = await req.json()
        const check = loginSchema.safeParse(data)

        if (!check.success) {
            return NextResponse.json({
                success: false,
                message: check.error
            })
        }

        const IsOld = await prisma.user.findUnique({
            where: {
                email: data.email
            },

        })
        if (IsOld) {
            const passcheck = await bcrypt.compare(data.password, IsOld.password)
            if (passcheck) {
                const token = await new SignJWT({ id: IsOld.id })
                    .setProtectedHeader({ alg: 'HS256' })
                    .setIssuedAt()
                    .setJti(nanoid())
                    .setExpirationTime('30d')
                    .sign(new TextEncoder().encode('blog_secret'))
                cookies().set("token", token, { maxAge: Date.now() + 30 * 24 * 60 * 60 * 1000 })
                return NextResponse.json({
                    success: true,
                    message: "Login successful",
                    token: token
                })
            }
            else {
                return NextResponse.json({
                    success: false,
                    message: "Incorrect password"
                })
            }

        }
        else {
            return NextResponse.json({
                success: false,
                message: "user does not exists"
            })
        }
    } catch (error) {
        return NextResponse.json({
            success: false,
            message: "Someting went wrong"
        })
    }
}