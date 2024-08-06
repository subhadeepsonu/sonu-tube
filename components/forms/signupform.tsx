"use client"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import z from "zod"
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
import { signUpSchema } from "@/app/api/signup/schema"
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import {  useRouter } from "next/navigation"
import Cookie from "universal-cookie"
export default function SignupForm(){
    const cookie = new Cookie()
    const form = useForm<z.infer<typeof signUpSchema>>({
        resolver:zodResolver(signUpSchema)
    })
    const values = form.getValues()
    const router = useRouter()
    const MutateSignup = useMutation({
        mutationFn:async ()=>{
            const data = await axios.post("/api/signup",{
                imgurl:values.imgurl,
                name:values.name,
                email:values.email,
                password:values.password
            })
            return data.data
        },
        onSettled:(data,error)=>{
            if(data.success){
                toast.success(data.message)
                cookie.set('token',`${data.token}`)
                router.refresh()  
                router.push("/")
            }
            if(!data.success){
                toast.error(data.message)
            }
            if(error){
                toast.error(`${error}`)
            }
        }
    })
    const MutateUploadImage = useMutation({
        mutationFn:async (files:any)=>{
            const data = new FormData()
            data.append("file",files[0])
            data.append("upload_preset","GFGVITAP")
            console.log("haha")
            
            const res = await fetch(`https://api.cloudinary.com/v1_1/djzuoefwo/image/upload`,{
              method:"POST",
              body:data
            })
            const file = await res.json()
            
            form.setValue("imgurl",file.secure_url)
        }
    }) 
    return <Form {...form}>
        <form onSubmit={form.handleSubmit(()=>{
            MutateSignup.mutate()
        })} className="h-full w-full flex flex-col justify-around items-center">
        <FormField
          control={form.control}
          name="imgurl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Upload Image</FormLabel>
              <FormControl>
                <Input disabled={MutateUploadImage.isPending}  className="w-72 hover:cursor-pointer" type="file" placeholder="image" onChange={ (e)=>{
          const files = e.target.files
          if(files && files.length>0){
            MutateUploadImage.mutate(files)
          
        }}} ></Input>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input className="w-72" placeholder="email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
          <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" className="w-72" placeholder="password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={MutateSignup.isPending} type="submit">Submit</Button>
        </form>
    </Form>
}