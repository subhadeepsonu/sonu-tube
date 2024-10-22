"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useMutation } from "@tanstack/react-query"

import { toast } from "sonner"
import { Textarea } from "../ui/textarea"
const formSchema = z.object({
  Title: z.string().min(2).max(50),
  Description: z.string().min(2).max(1000),
})

export default function EditAnnouncement(props: {
  id: number,
  title: string,
  description: string,
}) {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      Description: props.description,
      Title: props.title
    }
  })
  const values = form.getValues()
  const mutateAnnouncement = useMutation({
    mutationFn: async () => {

    },
    onSuccess: () => {
      toast.success("edited")
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })
  return <Form {...form}>
    <form className="h-56 flex flex-col justify-around items-center w-11/12" onSubmit={form.handleSubmit(() => {
      mutateAnnouncement.mutate()
    })}>
      <FormField
        control={form.control}
        name="Title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title</FormLabel>
            <FormControl>
              <Input placeholder="Title" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="Description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea placeholder="Description" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <Button disabled={mutateAnnouncement.isPending} type="submit">Submit</Button>
    </form>
  </Form>

}