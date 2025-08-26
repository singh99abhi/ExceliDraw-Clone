"use client"
import { Canvas } from "@/components/Canvas"
import { WEBSOCKET_URL } from "@/config";
import { initDraw } from "@/draw"
import { useEffect, useRef, useState } from "react"

export function RoomCanvas({roomId}:{roomId:string}){
    
    const [socket, setSocket] = useState<WebSocket | null>(null);
    useEffect(() => {
        const ws=new WebSocket(`${WEBSOCKET_URL}?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWV0MGExY3EwMDAwZm9ka2FncDFjc29mIiwiaWF0IjoxNzU2MjQwNTc3fQ.qCdI38tA0oJGm-cgQ_dxE-cj3WPg0GIvsticS2cqARQ`)
        ws.onopen = () => {
            setSocket(ws);
            ws.send(JSON.stringify({type:"join_room",roomId}))
        }
    },[])
    
    if (!socket){
        return <div>Loading...</div>
    }
        return <div>
            <Canvas roomId={roomId} socket={socket}/>   
           
        </div>
}