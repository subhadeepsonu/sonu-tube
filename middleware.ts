import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

export async function middleware(req: NextRequest) {
    // Access the token from the request cookies
    const token = req.cookies.get("token");

    if (!token?.value) {
        return NextResponse.json({
            success: false,
            message: "Not authorized",
        });
    }

    try {
        // Verify the token using jose
        const verify = await jwtVerify(token.value, new TextEncoder().encode("blog_secret"));
        const payload = verify.payload as { id: string };
        const reqHeaders = new Headers(req.headers);

        // Set x-user-id header with the payload id
        reqHeaders.set("x-user-id", payload.id);

        // Rewrite the request with updated headers
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
    matcher: ["/api/:path*"], // Ensure it applies to all API routes
};
