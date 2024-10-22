import z from "zod";
export const byTagSchema = z.object({
    tag: z.string().min(1)
});