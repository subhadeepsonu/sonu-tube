import { NextRequest, NextResponse } from "next/server";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { v4 as uuidv4 } from 'uuid';
export async function POST(req: NextRequest) {
    try {
        const { contentType } = await req.json();
        console.log(contentType)
        if (!contentType) {
            return NextResponse.json({
                success: false,
                message: "Content type is required"
            })
        }
        const uuid = uuidv4()
        const s3 = new S3Client({
            region: process.env.AWS_REGION!,
            credentials: {
                accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
                secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!
            }
        })
        const key = `${uuid}.${contentType.split('/')[1]}`
        const command = new PutObjectCommand({
            Bucket: process.env.AWS_BUCKET_NAME!,
            Key: key,
            ContentType: contentType,
        })
        const url = await getSignedUrl(s3, command, {
            expiresIn: 3600
        })
        return NextResponse.json({
            success: true,
            id: key,
            url: url
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: "Something went wrong"
        })
    }
}