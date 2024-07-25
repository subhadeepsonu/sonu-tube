"use client"
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import z from "zod"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
  } from "@/components/ui/form"
import { Button } from "../ui/button";
import { useMutation } from "@tanstack/react-query";
import { Textarea } from "../ui/textarea";
import { VideoPostComment } from "@/actions/video/comment";
export default function VideoAddComment(props:{
    userid:string,
    Videoid:number
}){
    const CommentSchema = z.object({
        comment:z.string().min(3,{message:"Minimum 3 letters"})
    })
    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver:zodResolver(CommentSchema),
        mode:"onChange"
    })
    const values =  form.getValues()
    const MutateAddComment = useMutation({
        mutationFn:()=>VideoPostComment(values.comment,props.userid,props.Videoid),
        onSettled:()=>{
            form.setValue("comment","")
        }
    },
)
    return <Form {...form} >
        <form  className=" w-full bg-white mb-5" onSubmit={form.handleSubmit(()=>{
            MutateAddComment.mutate()
        })}>
                <FormField
          control={form.control}
          name="comment"
          render={({ field }) => (
            <FormItem className="pt-2">
              <FormControl>
                <Textarea className="px-2" placeholder="Your Comment" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateAddComment.isPending} className="mt-2" type="submit">Add Comment</Button>
        </form>
    </Form>
}