import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import z from "zod"
import { signUpSchema } from "./schema";
import prisma from "@/db";
export async function POST(req: NextRequest){
    try {
        const data:z.infer<typeof signUpSchema> = await req.json()
        const check = signUpSchema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:"Invalid inputs"
            })
        }
        const IsOld = await prisma.user.findUnique({
            where:{
                email:data.email.toLowerCase()
            }
        })
        if(IsOld){
            return NextResponse.json({
                success:false,
                message:"User already exists"
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hash = await bcrypt.hash(data.password,salt)
        const response = await prisma.user.create({
            data:{
                email:data.email.toLowerCase(),
                name:data.name,
                password:hash
            }
        })
        const token = jwt.sign(response,process.env.JWT_SECERT!)
        return NextResponse.json({
            success:true,
            message:token
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:"Something went wrong"
        })
    }
}