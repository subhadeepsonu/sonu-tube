import z from "zod"
export const announcementBookmarkSchema = z.object({
    announcementid :z.number(),
    userid:z.string()
})