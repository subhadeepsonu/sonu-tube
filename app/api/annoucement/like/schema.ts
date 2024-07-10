import z from "zod"
export const annoucementLikeSchema = z.object({
    userid:z.string(),
    announcementid:z.number()
})