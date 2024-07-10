import z from "zod"
export const announcementSchema = z.object({
    title:z.string().min(3,{message:"Title must be a minimum 3 letter long"}),
    discription:z.string().min(10,{message:"Discription must be a minimum 10 letters long"}),
    userid:z.string()
})
export const announcementDeleteSchema = z.object({
    id:z.number()
})