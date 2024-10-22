"use client"
import { Button } from "../ui/button";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from "@/components/ui/sheet"

import { useMutation } from "@tanstack/react-query"
import EditAnnouncement from "../forms/editAnnoucement";
export default function OwnerAnnouncementCard(props: {
  id: number,
  title: string,
  description: string,
}) {
  const mutateDelete = useMutation({
    mutationFn: async () => {

    },
    onSuccess: () => {
      toast.success("deleted")
    },
    onError: (error) => {
      toast.error(`${error}`)
    }
  })
  return <div className="h-40 rounded-lg bg-transparent w-full border-2 border-gray-100 dark:border-zinc-800">
    <div className="h-20 w-full text-center flex justify-start pl-5 items-center">
      <p className="text-center">{props.title}</p>
    </div>
    <div className="h-20 w-full  flex justify-around items-center">

      <Sheet>
        <SheetTrigger><Button>edit</Button></SheetTrigger>
        <SheetContent className="bg-black">
          <SheetHeader className="h-full flex justify-center items-center">
            <EditAnnouncement description={props.description} id={props.id} title={props.title} key={props.id}></EditAnnouncement>
          </SheetHeader>
        </SheetContent>
      </Sheet>

      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button variant="destructive">{(mutateDelete.isPending) ? "wait" : "delete"}</Button>
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
            }}>{(mutateDelete.isPending) ? "wait" : "delete"}</Button>

          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

    </div>
  </div>
}