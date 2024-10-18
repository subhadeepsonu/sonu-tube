"use client"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { useMutation} from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { toast } from "sonner";
export default function Home() {
    const [file,setFile] = useState<File | undefined>();
    const [url,setUrl] = useState<string | undefined>();
    const [progress,setProgress] = useState<number>(0)
    const GetUrl = useMutation({
        mutationFn:async()=>{
            const response = await axios.post('/api/signedurl')
            if(response.data.url){
                const upload = await axios.put(response.data.url,file,{
                    onUploadProgress:(progressEvent)=>{
                        setProgress(Math.round((progressEvent.loaded * 100) / progressEvent.total!))
                    }
                })
                console.log(upload)
                if(upload.status==200){
                    setUrl(`https://sonutube.s3.ap-south-1.amazonaws.com/${response.data.id}`)
                }
            }
            return response.data
            
        },
        onSuccess:(data)=>{ 
            console.log()
        },
        onError:(error)=>{
            console.log(error)
            toast.error("Something went wrong")
        }

    })
    return<div className="min-h-screen pt-20 w-full flex gap-5 flex-col justify-center items-center">
        <video className="h-96 w-96" src="https://sonutube.s3.ap-south-1.amazonaws.com/75f871c2-852d-44fe-a5cc-ec240dd32bbc" controls></video>        
        <Label >Upload File</Label>
        <p>{(progress>0)?`${progress}%`:''}</p>
        {(progress>0)?<Progress className="w-96" value={progress} />:<p></p>}
        <Input onChange={(e)=>{
            if(e.target.files){
                setFile(e.target.files[0])
            }
        }} className="w-96 cursor-pointer" type="file" ></Input>
        <Button disabled={GetUrl.isPending} onClick={async ()=>{
            if(file){
                await GetUrl.mutate()
            }
            else{
                toast.error("Please select a file")
            }
        }}>upload</Button>
    </div>
}