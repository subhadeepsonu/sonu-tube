import z from "zod"
export const videoLikeSchema = z.object({
    videoid: z.number()
})