"use client";
import { BiLike, BiDislike, BiSolidLike, BiSolidDislike } from "react-icons/bi";
import { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import {jwtDecode} from "jwt-decode";
import Cookies from "universal-cookie";
import { AnnouncementAddLike, AnnouncementDeletelike } from "@/actions/annoucements/like";
import { AnnouncementAddDislike, AnnouncementDeleteDislike } from "@/actions/annoucements/unlike";
export default function AnnoucementHandler(props: any) {
  const [token, setToken] = useState<string | null>(null);
  const [decoded, setDecoded] = useState<any>(null);
  const [likes, setLikes] = useState(props.likes);
  const [dislikes, setDislikes] = useState(props.dislikes);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const cookie = new Cookies();
      const token = cookie.get("token");
      if (token) {
        setToken(token);
        const decodedToken: any = jwtDecode(token);
        setDecoded(decodedToken);
      }
    }
  }, [props.likes,props.dislikes,props.userlike,props.userdislike]);

  useEffect(() => {
    if (decoded) {
      const userLiked = props.userlike;
      const userDisliked = props.userdislike;

      userLiked.forEach((like: any) => {
        if (like.userid === decoded.id) {
          setLiked(true);
        }
      });

      userDisliked.forEach((dislike: any) => {
        if (dislike.userid === decoded.id) {
          setDisliked(true);
        }
      });
    }
  }, [decoded, props.userlike, props.userdislike]);

  const MutateAddLike =  useMutation({
    mutationFn:()=> AnnouncementAddLike(decoded.id,props.id)
})
const MutateRemoveLike = useMutation({
    mutationFn:()=>AnnouncementDeletelike(decoded.id,props.id)
})
const MutateAddDislike = useMutation({
    mutationFn:()=>AnnouncementAddDislike(decoded.id,props.id)
})
const MutateRemoveDislike = useMutation({
    mutationFn:()=>AnnouncementDeleteDislike(decoded.id,props.id)
})

  return (
    <div className="w-full h-10 flex justify-between items-center">
      <div className="flex justify-center items-center">
        {liked ? (
          <BiSolidLike
            onClick={() => {
              setLikes(likes - 1);
              setLiked(false);
              MutateRemoveLike.mutate();
            }}
            className="m-1 text-2xl hover:cursor-pointer"
          />
        ) : (
          <BiLike
            onClick={() => {
              setLikes(likes + 1);
              setLiked(true);
              if (disliked) {
                setDislikes(dislikes - 1);
                setDisliked(false);
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
              setDislikes(dislikes - 1);
              setDisliked(false);
              MutateRemoveDislike.mutate();
            }}
            className="m-1 text-2xl hover:cursor-pointer"
          />
        ) : (
          <BiDislike
            onClick={() => {
              setDislikes(dislikes + 1);
              setDisliked(true);
              if (liked) {
                setLikes(likes - 1);
                setLiked(false);
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
