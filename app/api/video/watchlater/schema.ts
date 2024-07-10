import z from "zod"
export const watchlaterSchema  =  z.object({
    userId :z.string(),
    videoId :z.number()
})
export const watchlaterDeleteSchema =  z.object({
    id:z.number()
})