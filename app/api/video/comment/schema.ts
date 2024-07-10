import z from "zod"
export const commentSchema = z.object({
    comment:z.string().min(3,{message:"Minimum 3 letters required"}),
    userid:z.string(),
    videoid:z.number()
})