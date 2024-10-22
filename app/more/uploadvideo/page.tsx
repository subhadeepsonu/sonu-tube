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
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import { redirect } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';
import axios from 'axios';
import { Progress } from '@/components/ui/progress';
export default function UploadVideoPage() {
  const [file, setFile] = useState<File | undefined>();
  const [file2, setFile2] = useState<File | undefined>();
  const [progress, setProgress] = useState<number>(0);
  const [progress2, setProgress2] = useState<number>(0);

  const uploadSchema = z.object({
    title: z.string().min(3),
    discription: z.string().min(20),
    thumbnailurl: z.string().min(1),
    videourl: z.string().min(1),
    tag: z.string().min(1)
  })
  const form = useForm<z.infer<typeof uploadSchema>>({
    resolver: zodResolver(uploadSchema),
    mode: "onChange"
  })
  const values = form.getValues()
  const MutateUpload = useMutation({
    mutationFn: () => AddVideo(values.title, values.discription, values.videourl, values.thumbnailurl, values.tag),
    onSuccess: () => {
      toast.success("Video upload complete")
      form.setValue("title", "")
      form.setValue("discription", "")
      form.setValue("thumbnailurl", "")
      form.setValue("videourl", "")
    },
    onError: () => {
      toast.error("could not upload video")
    }
  })
  const GetUrl = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/signedurl')
      if (response.data.url) {
        const upload = await axios.put(response.data.url, file, {
          onUploadProgress: (progressEvent) => {

            setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total!))
          }
        })
        console.log(upload)
        if (upload.status == 200) {


          form.setValue('videourl', `https://sonutube.s3.ap-south-1.amazonaws.com/${response.data.id}`)

        }
      }
      return response.data

    },
    onSuccess: (data) => {
      console.log()
    },
    onError: (error) => {
      console.log(error)
      toast.error("Something went wrong")
    }
  })
  const GetUrl2 = useMutation({
    mutationFn: async () => {
      const response = await axios.post('/api/signedurl')
      if (response.data.url) {
        const upload = await axios.put(response.data.url, file2, {
          onUploadProgress: (progressEvent) => {
            setProgress2(Math.round((progressEvent.loaded * 100) / progressEvent.total!))
          }
        })
        console.log(upload)
        if (upload.status == 200) {
          form.setValue('thumbnailurl', `https://sonutube.s3.ap-south-1.amazonaws.com/${response.data.id}`)
        }
      }
      console.log(response.data.id)
      return response.data
    },
    onSuccess: (data) => {
      console.log()
    },
    onError: (error) => {
      console.log(error)
      toast.error("Something went wrong")
    }
  })
  return <div className='min-h-screen dark:bg-zinc-950 md:pl-40  w-full bg-gray-50 flex  justify-around items-center pt-20 pb-20 md:pb-0 '>
    <div className='h-5/6 w-5/6 bg-white dark:bg-transparent p-2 rounded-lg flex flex-col border-2  justify-center items-center'>
      <Form  {...form}>
        <form onSubmit={form.handleSubmit(() => {
          MutateUpload.mutate()
          redirect('/more/video')
        })} className=' fex w-5/6 flex-col justify-around items-center'>
          <div className='w-full flex justify-center items-center pt-10'>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5'>
              <FormField
                control={form.control}
                name="videourl"
                render={() => (
                  <FormItem className='pb-5' >
                    <FormLabel>Upload Video</FormLabel>
                    <FormControl>
                      <Input disabled={(progress > 0 && progress < 100) ? true : false} accept='video/*' onChange={(e) => {
                        if (e.target.files) {
                          setFile(e.target.files[0])
                          GetUrl.mutate()
                        }
                      }} type="file" />
                    </FormControl>
                    {(progress > 0) ? `${progress}%` : <p></p>}
                    {(progress > 0) ? <Progress className="w-full" value={progress} /> : <p></p>}
                  </FormItem>
                )}
              /><FormField
                control={form.control}
                name="thumbnailurl"
                render={() => (
                  <FormItem className='pb-5'>
                    <FormLabel>Upload Thumbnail</FormLabel>
                    <FormControl>
                      <Input disabled={(progress2 > 0 && progress < 100) ? true : false} accept='image/*' onChange={(e) => {
                        if (e.target.files) {
                          setFile2(e.target.files[0])
                          GetUrl2.mutate()
                        }
                      }} type='file' placeholder="Thumbnail" />
                    </FormControl>
                    {(progress2 > 0) ? `${progress2}%` : <p></p>}
                    {(progress2 > 0) ? <Progress className="w-full" value={progress2} /> : <p></p>}
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
                            <SelectItem value="vlog">Vlog</SelectItem>
                            <SelectItem value="education">Education</SelectItem>
                            <SelectItem value="gaming">Gaming</SelectItem>
                            <SelectItem value="tech">Tech</SelectItem>
                            <SelectItem value="health">Health</SelectItem>
                            <SelectItem value="fashion">Fashion</SelectItem>
                            <SelectItem value="music">Music</SelectItem>
                            <SelectItem value="cooking">Cooking</SelectItem>
                            <SelectItem value="travel">Travel</SelectItem>
                            <SelectItem value="science">Science</SelectItem>
                            <SelectItem value="finance">Finance</SelectItem>
                            <SelectItem value="art">Art</SelectItem>
                            <SelectItem value="news">NEWS</SelectItem>
                            <SelectItem value="motivational">Motivational</SelectItem>
                            <SelectItem value="animals">Animals</SelectItem>
                            <SelectItem value="automotive">Automotive</SelectItem>
                            <SelectItem value="sports">Sports</SelectItem>
                            <SelectItem value="brainrot">Brain Rot</SelectItem>
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