"use client"

import dynamic from "next/dynamic";

const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });
export default function Home() {
  return (
    <div className="h-screen w-full flex justify-center items-center" >
      <ReactPlayer controls={true} playing={true} url={"https://res.cloudinary.com/dzwbh0yob/video/upload/v1720553636/pklhbokbcaxykrmbcnfp.mp4"}></ReactPlayer>
    </div>
  );
}
