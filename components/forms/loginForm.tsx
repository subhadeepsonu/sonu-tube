"use client"
import { loginSchema } from "@/app/api/login/schema"
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
import { useMutation } from "@tanstack/react-query"
import axios from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import Cookies from "universal-cookie"
import Link from "next/link"
export default function LoginForm() {
  const router = useRouter()
  const cookie = new Cookies()
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    mode: "onChange"
  })
  const values = form.getValues()
  const MutateLogin = useMutation({
    mutationFn: async () => {
      const data = await axios.post("/api/login", {
        email: values.email,
        password: values.password
      })
      return data.data
    },
    onSettled: (data, error) => {
      if (data.success) {
        toast.success(data.message)
        const expires = new Date();
        expires.setTime(expires.getTime() + 30 * 24 * 60 * 60 * 1000);
        cookie.set('token', data.token, { expires })
        router.refresh()
        router.push("/")
      }
      if (!data.success) {
        toast.error(data.message)
      }
      if (error) {
        toast.error(`${error}`)
      }
    }
  })


  return <Form {...form}>
    <form onSubmit={form.handleSubmit(() => {
      MutateLogin.mutate()
    })} className=" w-full flex justify-around items-center flex-col gap-5  " >
      <p className="font-bold text-4xl ">Login to SonuTube</p>
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
              <Input className="w-72" type="password" placeholder="password" {...field} />
            </FormControl>

            <FormMessage />
          </FormItem>
        )}
      />
      <Button className="w-72" disabled={MutateLogin.isPending} type="submit">Login</Button>
      <Button className="w-72 bg-green-500 hover:bg-green-500/80" onClick={() => {
        form.setValue("email", "test@gmail.com")
        form.setValue("password", "sonumonu")
      }}>Guest credentials</Button>
      <div className="text-center text-sm">
        Don&apos;t have an account?{' '}
        <Link href="/signup" className="font-medium text-red-600 hover:text-red-500">
          Sign up
        </Link>
      </div>
    </form>
  </Form>
}