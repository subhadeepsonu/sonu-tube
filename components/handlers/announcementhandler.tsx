"use client";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useMutation } from "@tanstack/react-query";
import { AnnouncementAddLike, AnnouncementDeletelike } from "@/actions/annoucements/like";
import { AnnouncementAddDislike, AnnouncementDeleteDislike } from "@/actions/annoucements/unlike";
import { useState } from "react";
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
    mutationFn: () => AnnouncementAddLike("", props.id)
  })
  const MutateRemoveLike = useMutation({
    mutationFn: () => AnnouncementDeletelike("", props.id)
  })
  const MutateAddDislike = useMutation({
    mutationFn: () => AnnouncementAddDislike("", props.id)
  })
  const MutateRemoveDislike = useMutation({
    mutationFn: () => AnnouncementDeleteDislike("", props.id)
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
