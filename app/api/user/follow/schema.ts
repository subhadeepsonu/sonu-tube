import z from "zod"
export const followschema = z.object({
    followerid: z.string()
})