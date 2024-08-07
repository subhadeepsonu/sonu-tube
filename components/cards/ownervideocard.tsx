"use client"
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiTrash } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { DeleteVideo } from "@/actions/video/deletevideo";
import { toast } from "sonner";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
  } from "@/components/ui/alert-dialog"

export default function OwnerVideoCard(props:{
    id:number,
    title:string,
    tumbnail:string
}){
    const mutateDelete = useMutation({
        mutationFn:()=>DeleteVideo(props.id),
        onSuccess:()=>{
            toast.success("Video deleted")
        },
        onError:(error)=>{
            console.log(error)
            
            toast.error("Something went wrong")
        }
    })
    return <div className="w-80 h-40 bg-white rounded-lg flex">
        <img src={props.tumbnail} className="h-full w-40 p-2 object-cover  "></img>
        <div className="flex flex-col justify-around items-start pl-2 h-full w-40">
        <p className="font-medium overflow-hidden truncate w-36">{props.title}</p>
        <div className=" w-full flex justify-around items-center">
        <Button><FaEdit></FaEdit></Button>
        <AlertDialog>
        <AlertDialogTrigger asChild>
        <Button variant="destructive">{(mutateDelete.isPending)?"wait":<BiTrash></BiTrash>}</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
            <AlertDialogHeader>Are you absolutely sure?</AlertDialogHeader>
            <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            video and remove the data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          
          <Button variant={"destructive"} disabled={mutateDelete.isPaused} onClick={()=>{
            mutateDelete.mutate()
        }}>{(mutateDelete.isPending)?"wait":<BiTrash></BiTrash>}</Button>   
          
        </AlertDialogFooter>
      </AlertDialogContent>
        </AlertDialog>
      
        </div>
        </div>
    </div>
}