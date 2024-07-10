import z from "zod"
export const videoDislikeSchema= z.object({
    userid:z.string(),
    videoid:z.number()
})