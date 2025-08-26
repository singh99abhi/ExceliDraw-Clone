import { use, useEffect, useState } from 'react';
import { WEBSOCKET_URL } from '../app/config';



export function useSocket() {
    const [loading, setLoading] = useState(true);
    const [socket, setSocket] = useState<WebSocket>()

    useEffect(() => {
        const ws= new WebSocket(`${WEBSOCKET_URL}/?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiJjbWV0MGExY3EwMDAwZm9ka2FncDFjc29mIiwiaWF0IjoxNzU2MjQwNTc3fQ.qCdI38tA0oJGm-cgQ_dxE-cj3WPg0GIvsticS2cqARQ`)
        ws.onopen = () => {
            setLoading(false)
            setSocket(ws)
        }
    },[])

    return {socket, loading}
 
}