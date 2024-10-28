"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";
import { FaRegBookmark } from "react-icons/fa6";
import { FaBookmark } from "react-icons/fa6";
import { toast } from "sonner";
export default function AnnouncementBookmark(props: {
    announcementid: number,
    bookmarks: boolean
}) {
    const queryClient = useQueryClient()
    const MutateAddBookmark = useMutation({
        mutationFn: async () => {
            const response = await axios.post("/api/annoucement/bookmark", {
                announcementid: props.announcementid
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmark", "annoucements"] })
            toast.success("Bookmark added")
        },
        onError: () => {
            toast.error("Something went wrong")
        }
    })
    const MutateRemoveBookmark = useMutation({
        mutationFn: async () => {
            const response = await axios.delete("/api/annoucement/bookmark", {
                data: {
                    announcementid: props.announcementid
                }
            })
            return response.data
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["bookmark", "annoucements"] })
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