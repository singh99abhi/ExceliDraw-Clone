"use client"
import { useEffect, useState } from 'react';
import { useSocket } from '../hook/useSocket';

export default function ChatRoomClient({
    messages,
    id
}:{
    messages: {message: string}[],
    id:string
}) {
    const {socket,loading}=useSocket()
    const [chats,setChats]=useState(messages || []) // Initialize with an empty array as a fallback
    const [currentMessage,setCurrentMessage]=useState("")

    useEffect(() => {
        if (socket && !loading) {
            socket.send(JSON.stringify({
                type: "join_room",
                roomId: id
            }));

            socket.onmessage = (event) => {
                const parsedData = JSON.parse(event.data);
                if (parsedData.type === "chat") {
                    setChats(prevChats => [...prevChats, { message: parsedData.message }]);
                }
            };

            socket.onclose = () => {
                console.log("WebSocket connection closed");
                // Handle disconnection if needed (e.g., attempt to reconnect)
            };

            socket.onerror = (error) => {
                console.error("WebSocket error:", error);
                // Handle errors if needed
            };
        }

        // Cleanup function to close the socket if the component unmounts or dependencies change
        return () => {
            if (socket) {
                // Depending on your useSocket implementation, you might need to handle
                // unsubscription from events or closing the socket more explicitly there.
                // If useSocket manages the socket lifecycle, this might not be necessary.
                // Example: socket.offmessage = null;
            }
        };
    }, [socket, loading, id]);

    const sendMessage = () => {
        if (socket && !loading && currentMessage.trim()) {
            socket.send(JSON.stringify({
                type: "chat",
                message: currentMessage.trim(),
                roomId: id
            }));
            setCurrentMessage("");
        }
    };

    return (
        <div>
            {chats && chats.map((m, index) => (
                <div key={index}>{m.message}</div>
            ))}
            <input
                type="text"
                value={currentMessage}
                onChange={(e) => setCurrentMessage(e.target.value)}
                placeholder="Type a message"
            />
            <button onClick={sendMessage}>Send Message</button>
        </div>
    );
}