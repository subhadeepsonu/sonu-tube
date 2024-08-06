"use client"
import { AddVideo } from '@/actions/video/addvideo';
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
    videourl:z.string().min(1)
  })
    const form = useForm<z.infer<typeof uploadSchema>>({
      resolver:zodResolver(uploadSchema),
      mode:"onChange"
    })
    const values = form.getValues()
    const MutateUpload = useMutation({
      mutationFn:()=>AddVideo(values.title,values.discription,values.videourl,values.thumbnailurl),
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
    return <div className='h-screen w-full bg-gray-50 flex  justify-around items-center'>
      <div className='h-5/6 w-5/6 bg-white rounded-lg flex flex-col  justify-center items-center'>
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(()=>{
          MutateUpload.mutate()
          redirect('/more/video')
        })} className=' fex w-5/6 flex-col justify-around items-center'>
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