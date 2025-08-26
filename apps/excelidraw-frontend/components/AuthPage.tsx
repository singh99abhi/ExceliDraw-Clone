"use client"
export function AuthPage({isSignin}:{
    isSignin: boolean;
    } 
) {
  return <div className="w-screeen h-screen flex justify-center items-center">
    <div className="p-6 m-2 bg-white rounded-lg ">
        <div  className="p-2">
            <input type="text" placeholder="Email"/>
        </div>
        <div  className="p-2">
            <input type="password" placeholder="Password"/>
        </div>
        <div className="p-2">
            <button className="bg-red-200 rounded p-2"onClick={()=>{

        }}>{isSignin?"Sign In":"Sign Up"}</button>
        </div> 
        </div>
        

  </div>
}