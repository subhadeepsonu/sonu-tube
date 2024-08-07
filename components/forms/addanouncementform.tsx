"use client"
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
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
import { Textarea } from "../ui/textarea"
import { useMutation } from "@tanstack/react-query"
import { AddAnnouncement } from "@/actions/annoucements/addannouncement"
import { toast } from "sonner"
import { SheetClose } from "../ui/sheet"
export default function AddAnnouncementForm(){
    const formScehma = z.object({
        title:z.string().min(3),
        discription:z.string().min(3),

    })
    const form = useForm<z.infer<typeof formScehma>>({
        resolver:zodResolver(formScehma),
        mode:"onChange"
    })
    const values = form.getValues()
    const MutateAddAnnoucement = useMutation({
      mutationFn:()=>AddAnnouncement(values.title,values.discription),
      onSuccess:()=>{
        toast.success("Successfull")
      },
      onError:()=>{
        toast.error("failed")
      }
    })
    return <Form {...form}>
        <form className="h-72 flex flex-col justify-around" onSubmit={form.handleSubmit(()=>{
            MutateAddAnnoucement.mutate()
        })}>
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Discription" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="discription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Discription</FormLabel>
              <FormControl>
                <Textarea placeholder="Discription" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SheetClose>
         <Button type="submit" disabled={MutateAddAnnoucement.isPending}>Add Annoucement</Button>
         </SheetClose>
        </form>
    </Form>
}