import z from "zod"
export const viewSchema = z.object({
    userid:z.string(),
    videoid:z.number()
})