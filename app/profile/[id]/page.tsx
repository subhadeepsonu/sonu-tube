export default function Profile({params}:{
    params:{
        id:string
    }
}){
    return <div className="h-screen w-screen flex justify-center items-center">
        {JSON.stringify(params.id)}
    </div>      
}