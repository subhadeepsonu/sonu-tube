import z from "zod"
export const annoucementDislikeSchema = z.object({
    userid:z.string(),
    announcementid:z.number()
})