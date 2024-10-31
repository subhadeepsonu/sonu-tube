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
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Textarea } from "../ui/textarea";
import axios from "axios";
export default function AnnouncementAddComment(props: {
    announcementid: number
}) {
    const CommentSchema = z.object({
        comment: z.string().min(3, { message: "Minimum 3 letters" })
    })
    const querClient = useQueryClient();
    const form = useForm<z.infer<typeof CommentSchema>>({
        resolver: zodResolver(CommentSchema),
        mode: "onChange"
    })
    const values = form.getValues()
    const MutateAddComment = useMutation({
        mutationFn: async () => {
            const response = await axios.post(`/api/annoucement/comment`, {
                comment: values.comment,
                announcementid: props.announcementid
            })
            return response.data
        },
        onSettled: () => {
            form.reset()
            querClient.invalidateQueries({ queryKey: ["comments"] })
        }
    },
    )
    return <Form {...form} >
        <form className="w-11/12" onSubmit={form.handleSubmit(() => {
            MutateAddComment.mutate()
        })}>
            <FormField
                control={form.control}
                name="comment"
                render={({ field }) => (
                    <FormItem className="mt-2">
                        <FormControl>
                            <Textarea className="mx-2" placeholder="Your Comment" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <Button disabled={MutateAddComment.isPending} className="mt-2" type="submit">Add Comment</Button>
        </form>
    </Form>
}