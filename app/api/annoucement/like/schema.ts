import z from "zod"
export const annoucementLikeSchema = z.object({
    announcementid: z.number()
})