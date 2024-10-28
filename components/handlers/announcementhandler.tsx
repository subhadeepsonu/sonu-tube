"use client";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import axios from "axios";
export default function AnnoucementHandler(props: {
  id: number,
  likes: number,
  liked: boolean,
  dislikes: number,
  disliked: boolean
}) {
  const [likes, SetLikes] = useState(props.likes)
  const [dislikes, SetDislikes] = useState(props.dislikes)
  const [liked, SetLiked] = useState(props.liked)
  const [disliked, SetDisliked] = useState(props.disliked)
  const MutateAddLike = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/annoucement/like", {
        announcementid: props.id
      })
      return response.data
    }
  })
  const MutateRemoveLike = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/annoucement/like", {
        data: {
          announcementid: props.id
        }
      })
      return response.data
    }
  })
  const MutateAddDislike = useMutation({
    mutationFn: async () => {
      const response = await axios.post("/api/annoucement/dislike", {
        announcementid: props.id
      })
      return response.data
    }
  })
  const MutateRemoveDislike = useMutation({
    mutationFn: async () => {
      const response = await axios.delete("/api/annoucement/dislike", {
        data: {
          announcementid: props.id
        }
      })
      return response.data
    }
  })

  return (
    <div className="w-full h-10 flex justify-between items-center">
      <div className="flex justify-center items-center">
        {liked ? (
          <BiSolidLike
            onClick={() => {
              SetLikes(likes - 1);
              SetLiked(false);
              MutateRemoveLike.mutate();
            }}
            className="m-1 text-2xl hover:cursor-pointer"
          />
        ) : (
          <BiLike
            onClick={() => {
              SetLikes(likes + 1);
              SetLiked(true);
              if (disliked) {
                SetDislikes(dislikes - 1);
                SetDisliked(false);
              }
              MutateAddLike.mutate();
            }}
            className="m-1 text-2xl hover:cursor-pointer"
          />
        )}
        {likes} | {dislikes}
        {disliked ? (
          <BiSolidDislike
            onClick={() => {
              SetDislikes(dislikes - 1);
              SetDisliked(false);
              MutateRemoveDislike.mutate();
            }}
            className="m-1 text-2xl hover:cursor-pointer"
          />
        ) : (
          <BiDislike
            onClick={() => {
              SetDislikes(dislikes + 1);
              SetDisliked(true);
              if (liked) {
                SetLikes(likes - 1);
                SetLiked(false);
              }
              MutateAddDislike.mutate();
            }}
            className="m-1 text-2xl hover:cursor-pointer"
          />
        )}
      </div>

      {/* <CommentCard id={props.id} ></CommentCard> */}
    </div>
  );
}
