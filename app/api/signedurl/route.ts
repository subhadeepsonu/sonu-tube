import aws from 'aws-sdk'
import { NextResponse } from 'next/server';
const s3 = new aws.S3({
    region:process.env.region,
    accessKeyId:process.env.Access_key,
    secretAccessKey:process.env.Secret_key,
    signatureVersion:"v4"
})
export async function GET(){
    try {
        const imageName = "random-imame";
        const params=({
            Bucket:process.env.S3_BUCKET_NAME,
            Key:imageName,
            Expires:60
        })
        const singedUrl = await s3.getSignedUrlPromise('putObject',params)
        return NextResponse.json({
            success:true,
        message:singedUrl      
    })
    } catch (error) {
       return NextResponse.json({
            success:false,
            message:`${error}`
        })
    }
}