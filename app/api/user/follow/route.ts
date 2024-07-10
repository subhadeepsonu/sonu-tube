import { NextRequest, NextResponse } from "next/server";
import { followschema } from "./schema";
import z from "zod"
import prisma from "@/db";
export async function POST(req:NextRequest){
    try {
        const data:z.infer<typeof followschema> = await req.json()
        const check = followschema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.follows.create({
            data:{
                follwerId:data.followerid,
                userId:data.userid
            }
        })
        return NextResponse.json({
            success:true,
            message:response
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:`${error}`
        })
    }
}
export async function DELETE(req:NextRequest){
    try {
        const data:z.infer<typeof followschema> = await req.json()
        const check = followschema.safeParse(data)
        if(!check.success){
            return NextResponse.json({
                success:false,
                message:`${check.error}`
            })
        }
        const response = await prisma.follows.deleteMany({
            where:{
                follwerId:data.followerid,
                userId:data.userid
            }
        })  
        return NextResponse.json({
            success:true,
            message:response
        })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:`${error}`
        })
    }
}