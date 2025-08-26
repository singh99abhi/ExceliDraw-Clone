import { HTTP_BACKEND_URL } from "@/config"
import axios from "axios"

export async function getExistingShapes(roomId:string){
    const res =await axios.get(`${HTTP_BACKEND_URL}/chats/${roomId}`)
    const messages = res.data.messages
    console.log(messages)
    const shapes= messages.map((x:{message:string}) => {
        const messageData = JSON.parse(x.message)    
        return messageData
    })
    return shapes
}   