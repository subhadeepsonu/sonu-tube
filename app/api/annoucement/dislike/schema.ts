import z from "zod"
export const annoucementDislikeSchema = z.object({
    announcementid: z.number()
})