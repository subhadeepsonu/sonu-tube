import { NextResponse } from "next/server";

export async function POST(){
    try {
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:`${error}`
        })
    }
}

export async function DELETE(){
    try {
        
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:`${error}`
        })
    }
}