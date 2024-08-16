export default function CommentCard(props:{
    comment:string,
    username:string,
    imgurl:string
}){
    return <div className="min-h-28 dark:bg-transparent dark:text-white bg-white w-full   shadow-sm rounded-lg my-2 p-2  ">
        <div className="flex justify-start items-center ">
        <img src={props.imgurl} alt="photo" className="rounded-full  h-10 w-10 object-cover"></img>
        <div className="pl-2 font-semibold">
            {props.username}
        </div>
        </div>
        <div className="pt-2 pl-2">
            {props.comment}
        </div>
    </div>
}