"use client"
import SignupForm from "@/components/forms/signupform";
import { BackgroundBeams } from "@/components/ui/background-beams";

export default function AuthPage() {
    return <div className="h-screen w-full flex justify-center items-center  ">
        <BackgroundBeams />
        <div className="w-96 z-30   rounded-lg  flex justify-center items-center ">
            <SignupForm />
        </div>
    </div>
}