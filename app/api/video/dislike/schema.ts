import z from "zod"
export const videoDislikeSchema = z.object({
    videoid: z.number()
})