import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    const token = req.cookies.get("token");
    if (!token?.value) {
        return NextResponse.json({
            success: false,
            message: "Not authorized",
        });
    }
    try {
        const verify = await jwtVerify(token.value, new TextEncoder().encode("blog_secret"));
        const payload = verify.payload as { id: string };
        const reqHeaders = new Headers(req.headers);

        reqHeaders.set("x-user-id", payload.id);

        return NextResponse.rewrite(req.nextUrl, {
            request: {
                headers: reqHeaders,
            },
        });
    } catch (error) {
        console.error(error);
        return NextResponse.json({
            success: false,
            message: "Not authorized",
        });
    }
}

export const config = {
    matcher: ["/api/annoucement/:path*",
        "/api/signedurl",
        "/api/user/:path*",
        "/api/video/:path*"
    ],
};
