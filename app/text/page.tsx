import RecommandedVideo from "@/components/clientpages/RecommendingVideo";

export default  function Page(){
    return <div className="flex justify-center items-center pt-20 pl-20 h-screen w-full bg-gray-50">
                <RecommandedVideo tag={"music"}></RecommandedVideo>
    </div>
}