import z from "zod"
export const recommendationSchema = z.object({
    tag: z.string(),
    currentid: z.number()
})