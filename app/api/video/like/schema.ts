import z from "zod"
export const videoLikeSchema = z.object({
    userid:z.string(),
    videoid:z.number()
})