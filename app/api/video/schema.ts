import z from "zod"
export const videoSchema = z.object({
    title:z.string().min(3,{message:"Title must be minimum  3 letters long"}),
    discription:z.string().min(20,{message:"Discription must be minimum 20 letters longs"}),
    video:z.string(),
    thumbnail:z.string(),
    userid:z.string()
})

export const videoDeleteSchema = z.object({
    id:z.number()
})