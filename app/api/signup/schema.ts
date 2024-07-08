import z from "zod"
export const signUpSchema = z.object({
    name:z.string(),
    password:z.string(),
    email:z.string()
})