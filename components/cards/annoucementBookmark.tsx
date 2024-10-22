"use client"
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { toast } from "sonner";
export default function AnnouncementBookmark(props: {
    announcementid: number,
    bookmarks: boolean
}) {
    const MutateAddBookmark = useMutation({
        mutationFn: async () => {

        },
        onSuccess: () => {
            toast.success("Bookmark added")
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    const MutateRemoveBookmark = useMutation({
        mutationFn: async () => {

        },
        onSuccess: () => {
            toast.warning("Bookmark removed")
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    const [bookmark, setBookmark] = useState<boolean>(props.bookmarks)
    return <div>
        {(bookmark) ? <FaBookmark onClick={() => {
            setBookmark(false)
            MutateRemoveBookmark.mutate()
        }} className="hover:cursor-pointer " /> : <FaRegBookmark onClick={() => {
            setBookmark(true)
            MutateAddBookmark.mutate()
        }} className="hover:cursor-pointer" />}
    </div>
}