"use client"
import LoginForm from "@/components/forms/loginForm";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AuthPage() {
    return <div className="h-screen w-full flex justify-center items-center">
        <BackgroundBeams />
        <div className="w-96 h-fit  z-30   rounded-lg  flex justify-center items-center ">
            <LoginForm />
        </div>
    </div>
}