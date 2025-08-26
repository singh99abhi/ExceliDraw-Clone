import { initDraw } from "@/draw"
import {  Circle, Pencil, RectangleHorizontal } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { IconButton } from "./Icon"
import { Game } from "@/draw/game"

export type tool = "pencil"|"rect"|"circle"


export function Canvas({roomId,socket}:{roomId:string,socket:WebSocket}) {
    const canvasRef=useRef<HTMLCanvasElement>(null)
    const [selectedTool,setSelectedTool]=useState<tool>("pencil")
    const [game, setGame] = useState<Game>()
    useEffect(()=>{
        game?.setSelectedTool(selectedTool)
    },[selectedTool,game])
  useEffect(()=>{
        if(canvasRef.current){
            const g=new Game(canvasRef.current,roomId,socket)
            setGame(g)
        }
            
    },[canvasRef])
    return <div>
         <canvas ref ={canvasRef}width={window.innerWidth} height={window.innerHeight}></canvas>
         <TopBar selectedTool={selectedTool} setSelectedTool={setSelectedTool}/>
         
    </div>


}

function TopBar({selectedTool, setSelectedTool}: {selectedTool: tool, setSelectedTool: (s: tool) => void}) {
    return <div style={{position:"fixed",top:10,left:10,color:"white"}}>
            <div className="flex gap-2"> 
                <IconButton onClick={()=>{setSelectedTool("pencil")}}
                activated={selectedTool==="pencil"} icon={<Pencil/>} ></IconButton>
                <IconButton onClick={()=>{setSelectedTool("rect")}} 
                activated={selectedTool==="rect"} icon={<RectangleHorizontal/>} ></IconButton>
                <IconButton onClick={()=>{setSelectedTool("circle")}}
                activated={selectedTool==="circle"}icon={<Circle/>} ></IconButton>
            </div>

         </div>
}