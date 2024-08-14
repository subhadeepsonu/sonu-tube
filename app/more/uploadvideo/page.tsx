"use client"
import { AddVideo } from '@/actions/video/addvideo';
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import AddAnnouncementForm from "@/components/forms/addanouncementform"
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';

import { useMutation } from '@tanstack/react-query';
import { CldUploadWidget } from 'next-cloudinary';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
export default  function UploadVideoPage(){
  const [loading,Setloading] = useState(false)
  const uploadSchema = z.object({
    title:z.string().min(3),
    discription:z.string().min(20),
    thumbnailurl:z.string().min(1),
    videourl:z.string().min(1),
    tag:z.string().min(1)
  })
    const form = useForm<z.infer<typeof uploadSchema>>({
      resolver:zodResolver(uploadSchema),
      mode:"onChange"
    })
    const values = form.getValues()
    const MutateUpload = useMutation({
      mutationFn:()=>AddVideo(values.title,values.discription,values.videourl,values.thumbnailurl,values.tag),
      onSuccess:()=>{
        toast.success("Video upload complete")
        form.setValue("title","")
        form.setValue("discription","")
        form.setValue("thumbnailurl","")
        form.setValue("videourl","")
      },
      onError:()=>{
        toast.error("could not upload video")
      }
    })
    return <div className='min-h-screen dark:bg-zinc-950 w-full bg-gray-50 flex  justify-around items-center pt-20 pb-20'>
      <Sheet>
                        <SheetTrigger>
                    <Button className="absolute bottom-2 right-2">Add Announcement</Button>
                    </SheetTrigger>
                    <SheetContent>
                        <SheetHeader>
                            <SheetTitle >Add Announcement</SheetTitle>
                            <SheetContent>
                                <AddAnnouncementForm></AddAnnouncementForm>
                            </SheetContent>
                        </SheetHeader>
                    </SheetContent>
                    </Sheet>
        <div className='h-5/6 w-5/6 bg-white dark:bg-transparent p-2 rounded-lg flex flex-col  justify-center items-center'>
      
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(()=>{
          MutateUpload.mutate()
          redirect('/more/video')
        })} className=' fex w-5/6 flex-col justify-around items-center'>
          <div className='w-full flex justify-center items-center pt-10'>
          <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
          <FormField 
  control={form.control}
  name="videourl"
  render={({ field }) => (
    <FormItem className='pb-5' >
      <FormLabel>Upload Video</FormLabel>
      <FormControl>
      <CldUploadWidget 
      onClose={()=>{
        Setloading(false)
      }}
        options={{sources:["local"]}}
        onSuccess={(result:any, { widget  }) => {
            form.setValue("videourl",result.info.secure_url)
             widget.close();
  }} uploadPreset="sonu-tube"
  >
  {({ open }) => {
    return (
      <Button disabled={loading} className='block'  onClick={() =>{
        Setloading(true)
        open()
      }
      
      }>
        {(loading)?"Uploading...":"Upload Video"}
      </Button>
    );
  }}
</CldUploadWidget>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/><FormField
  control={form.control}
  name="thumbnailurl"
  render={({ field }) => (
    <FormItem className='pb-5'>
      <FormLabel>Upload Thumbnail</FormLabel>
      <FormControl>
      <CldUploadWidget 
      onClose={()=>{
        Setloading(false)
      }}
        options={{sources:["local"]}}
        onSuccess={(result:any, { widget }) => {
            form.setValue("thumbnailurl",result.info.secure_url)

             widget.close();
  }} uploadPreset="sonu-tube"
  >
  {({ open }) => {
    return (
      <Button disabled={loading} className='block'  onClick={() => {
        Setloading(true)
        open()}}>
        {(loading)?"Uploading...":"Upload Thumbnail"}
      </Button>
    );
  }}
</CldUploadWidget>
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>
<FormField
  control={form.control}
  name="tag"
  render={({ field }) => (
    <FormItem className='pb-5'>
      <FormLabel>category</FormLabel>
      <FormControl >
        <Select onValueChange={field.onChange}>
        <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Select a category" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Categories</SelectLabel>
          <SelectItem  value="vlog">Vlog</SelectItem>
          <SelectItem  value="education">Education</SelectItem>
          <SelectItem  value="gaming">Gaming</SelectItem>
          <SelectItem  value="tech">Tech</SelectItem>
          <SelectItem  value="health">Health</SelectItem>
          <SelectItem  value="fashion">Fashion</SelectItem>
          <SelectItem  value="music">Music</SelectItem>
          <SelectItem  value="cooking">Cooking</SelectItem>
          <SelectItem  value="travel">Travel</SelectItem>
          <SelectItem  value="science">Science</SelectItem>
          <SelectItem  value="finance">Finance</SelectItem>
          <SelectItem  value="art">Art</SelectItem>
          <SelectItem  value="news">NEWS</SelectItem>
          <SelectItem  value="motivational">Motivational</SelectItem>
          <SelectItem  value="animals">Animals</SelectItem>
          <SelectItem  value="automotive">Automotive</SelectItem>
          <SelectItem  value="sports">Sports</SelectItem>
          <SelectItem  value="brainrot">Brain Rot</SelectItem>
        </SelectGroup>
      </SelectContent>
        </Select>
      </FormControl>
      <FormDescription>This  will help us recommend your video properly</FormDescription>
      <FormMessage />
    </FormItem>
  )}
/>
          </div>
          </div>
        <FormField
  control={form.control}
  name="title"
  render={({ field }) => (
    <FormItem className='pb-5'>
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
  name="discription"
  render={({ field }) => (
    <FormItem className='pb-5'>
      <FormLabel>Discription</FormLabel>
      <FormControl>
        <Textarea className='h-32' placeholder="Discription" {...field} />
      </FormControl>
      <FormMessage />
    </FormItem>
  )}
/>

<Button disabled={MutateUpload.isPending} type='submit'>Submit</Button>
        </form>
      </Form>
      
      </div>
        
    </div>
}