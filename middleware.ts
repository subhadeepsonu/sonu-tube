import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";
import { cookies } from "next/headers";

export async function middleware(req: NextRequest) {
    const path = req.nextUrl.pathname
    const token = cookies().get("token")
    const isPublicPath = path === "/login" || path === "/signup" || path.startsWith("/explore") || path === "/announcement" || path === "/history" || path === "/liked" || path.startsWith("/more") || path.startsWith("profile") || path.startsWith("/video")
    if (isPublicPath && token?.value) {
        return NextResponse.redirect(new URL("/", req.url))
    }

    if (path == "/" && !token?.value) {
        return NextResponse.redirect(new URL("/login", req.url))
    }


    if (path !== "/login" && path !== "/signup") {
        if (!token?.value) {
            return NextResponse.json({
                success: false,
                message: "Not authorized",
            });
        }
        try {
            const verify = await jwtVerify(token?.value!, new TextEncoder().encode("blog_secret"));
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
}

export const config = {
    matcher: ["/api/annoucement/:path*",
        "/api/signedurl",
        "/api/user/:path*",
        "/api/video/:path*",
        "/login",
        "/signup",
        "/explore/:path*",
        "/announcement",
        "/history",
        "/liked",
        "/more/:path*",
        "/profile/:path*",
        "/video/:path*"

    ],
};
