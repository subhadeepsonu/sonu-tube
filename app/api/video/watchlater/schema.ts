import z from "zod"
export const watchlaterSchema = z.object({

    id: z.number(),
})
export const watchlaterDeleteSchema = z.object({
    id: z.number()
})