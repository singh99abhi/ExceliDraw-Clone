import { get } from "http";
import { init } from "next/dist/compiled/webpack/webpack";
import { getExistingShapes } from "./http";
// Define tool type here to match the string literals used
type tool = "rect" | "circle" | "pencil";

type Shape = {
    type:"rect",
    x:number,
    y:number,
    width:number,
    height:number,

} |{
    type:"circle",
    centerX:number,
    centerY:number,
    radius:number,
}|{
    type:"pencil",
    startX:number,
    startY:number,
    endX:number,
    endY:number,
}

export class Game{
    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D | null = null;
    private existingShapes: Shape[]
    private roomId: string;
    private socket: WebSocket;
    private isDrawing: boolean = false;
    private startX: number = 0;
    private startY: number = 0;
    private selectedTool: tool = "rect"; // Default tool

    constructor(canvas: HTMLCanvasElement,roomId:string,socket:WebSocket) {
        this.canvas = canvas;
        this.ctx = this.canvas.getContext("2d");
        this.existingShapes= []
        this.roomId=roomId
        this.init()
        this.socket = socket;
        this.initHandlers();
        this.mouseHandlers();
    }
    async init() {
        this.existingShapes=await getExistingShapes(this.roomId);
        this.clearCanvas();
    }
    setSelectedTool(tool: tool) {
        this.selectedTool = tool;
        
    }
    initHandlers() {
                    this.socket.onmessage = (event) => {
                const message = JSON.parse(event.data)
                if (message.type === "chat") {
                    const parsedShape=JSON.parse(message.message)
                    this.existingShapes.push(parsedShape)
                    this.clearCanvas()
                }
            }
     
    }
    clearCanvas() {
        if (!this.ctx) return;
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.fillStyle = "rgba(0, 0, 0)";
        this.ctx.fillRect(0,0, this.canvas.width, this.canvas.height);
        this.existingShapes.map((shape) => {
            if (!this.ctx) return;
            if (shape.type === "rect") {
                this.ctx.strokeStyle = "rgba(255,255,255)";
                this.ctx.strokeRect(shape.x, shape.y, shape.width, shape.height);
            } else if(shape.type === "circle"){
                this.ctx.beginPath();
                this.ctx.arc(shape.centerX, shape.centerY, shape.radius, 0, Math.PI * 2);
                this.ctx.stroke();
                this.ctx.closePath();
            }
        })
    }
    mouseHandlers() {
        
        this.canvas.addEventListener("mousedown", (e) => {
                this.isDrawing = true;
                
                this.startX = e.clientX;
                this.startY = e.clientY;

            })
         this.canvas.addEventListener("mouseup", (e) => {
                this.isDrawing = false;
                const width = e.clientX - this.startX;
                const height = e.clientY - this.startY;

                //@ts-ignore
                const selectedTool=this.selectedTool
                let shape:Shape|null=null;
                if (selectedTool === "rect") {
                    shape = {
                    //@ts-ignore
                    type:"rect",
                    x:this.startX,
                    y:this.startY,
                    width:width,
                    height:height,
                }
                
                }else if (this.selectedTool === "circle") {
                    
                    const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
                    const centerX = this.startX + radius/ 2;
                    const centerY = this.startY + radius / 2;
                    shape = {
                        type:"circle",
                        centerX,
                        centerY,
                        radius,
                    }
                    
                }
                if (!shape) return
                this.existingShapes.push(shape)
                
                this.socket.send(JSON.stringify({
                    type:"chat",
                    message:JSON.stringify(shape), 
                    roomId:this.roomId
                }))


                
            })   
            this.canvas.addEventListener("mousemove", (e) => {
                if (this.isDrawing){
                    
                    const width = e.clientX - this.startX;
                    const height = e.clientY - this.startY;
                    this.clearCanvas();
                    if (!this.ctx) return;
                    this.ctx.strokeStyle = "rgba(255,255,255)";
                    //@ts-ignore
                    const selectedTool = this.selectedTool
                    if(selectedTool === "rect"){
                         this.ctx.strokeRect(this.startX, this.startY, width, height);
                    }else if(selectedTool === "circle"){
                        const centerX = this.startX + width / 2;
                        const centerY = this.startY + height / 2;
                        const radius = Math.max(Math.abs(width), Math.abs(height)) / 2;
                        this.ctx.beginPath();
                        this.ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                        this.ctx.stroke();
                    }
                };
                
                
            })             
    }

}