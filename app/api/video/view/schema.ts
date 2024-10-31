import z from "zod"
export const viewSchema = z.object({
    videoid: z.number()
})