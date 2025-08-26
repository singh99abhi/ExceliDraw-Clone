  "use client";
  import styles from "./page.module.css";
  import { use, useState } from "react";
  import { useRouter } from "next/navigation";

  export default function Home() {
    const [roomId, setRoomId] = useState("");
    const router=useRouter();

    return (
      <div style={
        {
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }
      }>
        <div>
                <div>
                  <input style={
                    {
                      padding: "10px",
                      borderRadius: "5px",
                    }
                  } type="text" value={roomId}onChange={(e) => setRoomId(e.target.value)} placeholder="Room ID"/>

                <button style={
                  {
                    padding: "10px",
                    borderRadius: "5px",
                  
                  }
                }onClick={()=>{
                  
                    router.push(`/room/${roomId}`);
                  
                }}>Join Room</button>
                </div>
        </div>
        
      </div>
    );
  }
