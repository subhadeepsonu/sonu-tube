import { createReadStream, statSync } from "fs";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json()
        console.log(body)
        const stat = statSync(body.url)
        console.log(stat)
        const chucksize = 10 ** 6
        const start = Number()
        const stream = createReadStream(body.url, {
            start: 0,
            end: 100000
        })
        return NextResponse.json(body.url)
    } catch (error) {
        return NextResponse.json({
            status: false,
            message: `${error}`
        })
    }
}