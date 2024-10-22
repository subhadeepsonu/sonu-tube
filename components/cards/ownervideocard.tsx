"use client"
import { FaEdit } from "react-icons/fa";
import { Button } from "../ui/button";
import { BiTrash } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditVideo from "../forms/editvideo";

export default function OwnerVideoCard(props: {
  id: number,
  title: string,
  tumbnail: string,
  description: string,
}) {
  const mutateDelete = useMutation({
    mutationFn: async () => {

    },
    onSuccess: () => {
      toast.success("Video deleted")
    },
    onError: (error) => {
      console.log(error)

      toast.error("Something went wrong")
    }
  })
  return <div className="w-ful h-40 dark:bg-transparent dark:border-zinc-800 dark:text-white bg-white border-2 border-gray-100 shadow-sm rounded-lg flex">
    <img src={props.tumbnail} className="h-full w-1/2 p-2 object-cover  "></img>
    <div className="flex flex-col justify-around items-start pl-2 h-full w-40">
      <p className="font-medium overflow-hidden truncate w-36">{props.title}</p>
      <div className=" w-full flex justify-around items-center">
        <Sheet>
          <SheetTrigger><Button >{(mutateDelete.isPending) ? "wait" : <FaEdit></FaEdit>}</Button></SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <EditVideo id={props.id} title={props.title} description={props.description}></EditVideo>
            </SheetHeader>
          </SheetContent>
        </Sheet>
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">{(mutateDelete.isPending) ? "wait" : <BiTrash></BiTrash>}</Button>
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

              <Button variant={"destructive"} disabled={mutateDelete.isPaused} onClick={() => {
                mutateDelete.mutate()
              }}>{(mutateDelete.isPending) ? "wait" : <BiTrash></BiTrash>}</Button>

            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>

      </div>
    </div>
  </div>
}