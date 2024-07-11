"use client"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
  } from "@/components/ui/tabs"
  import Lottie from "lottie-react";
  import  loginanimation from "@/public/loginanimation.json"
import LoginForm from "@/components/forms/loginForm";
import SignupForm from "@/components/forms/signupform";
export default function AuthPage(){
    return <div className="h-screen w-full flex justify-center items-center">
        <div className="h-2/3 w-1/2 shadow-sm rounded-lg border-2 border-gray-100 flex justify-center items-center">
        <Tabs defaultValue="Login" className="h-full w-1/2 flex-col flex justify-center items-center">
            <TabsList className="w-2/3"  >
                <TabsTrigger className="w-1/2" value="Login">
                Login
                </TabsTrigger>
                <TabsTrigger className="w-1/2" value="Signup">SignUp</TabsTrigger>
            </TabsList>
            <TabsContent value="Login">
            <div className="h-96 w-80 flex justify-center items-center ">
                <LoginForm></LoginForm>
            </div>
            </TabsContent>
            <TabsContent value="Signup">
            <div className="h-96 w-80 ">
                <SignupForm></SignupForm>
                </div>
            </TabsContent>
        </Tabs>
        <div className="h-full w-1/2     rounded-r-lg flex justify-center items-center">
            <Lottie animationData={loginanimation}></Lottie>
        </div>
        </div>
    </div>
}