"use server"
import prisma from "@/db"
export default async function GetAllVideos(skip: number) {

    try {
        const response = await prisma.video.findMany({
            skip: skip * 10,
            take: 10,
            orderBy: {
                createdat: "desc"
            },
            where: {
                publish: true
            }, include: {
                user: {
                    select: {
                        name: true,
                        imgurl: true,
                        id: true
                    }
                },
                _count: {
                    select: {
                        views: {

                        }
                    }
                },
            }
        })
        const count = await prisma.video.count()
        console.log(response)
        return {
            data: response,
            count: count
        }
    } catch (error) {
        throw new Error(`${error}`)
    }
}