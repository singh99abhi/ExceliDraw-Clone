import { WebSocketServer, WebSocket } from 'ws';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import {prismaClient} from '@repo/db/client';

const wss = new WebSocketServer({ port: 8080 });

interface User {
  userId: string;
  rooms: string[];
  ws: WebSocket;
}

const users: User[] = [];

function checkUser(token: string): string | null {
  try {
    const decoded = jwt.verify(token, JWT_SECRET) as JwtPayload;
    if (!decoded || !decoded.userId) {
      return null;
    }
    return decoded.userId;
  } catch (error) {
    return null; // Token verification failed
  }
}

wss.on('connection', function connection(ws, request) {
  const url = request.url;
  if (!url) {
    return;
  }
  const queryparams = new URLSearchParams(url.split('?')[1]);
  const token = queryparams.get('token') || "";
  const userId = checkUser(token);
  if (!userId) {
    ws.close(4000, "Invalid token");
    return;
  }
  users.push({
    userId,
    rooms: [],
    ws
  });

  ws.on('message', async function message(data) {
     
      const parsedData = JSON.parse(data.toString());
      console.log("parsedData",parsedData)
      if (parsedData.type === 'join_room') {
        const user = users.find(x => x.ws === ws);
        user?.rooms.push(parsedData.roomId);

      }
      if (parsedData.type === 'leave_room') {
        const user = users.find(x => x.ws === ws);
        if (!user) {
          return;
        }
        user.rooms = user.rooms.filter(x => x !== parsedData.roomId);
      }
      if (parsedData.type === "chat") {
        const roomId = parsedData.roomId;
        const message = parsedData.message;

        await prismaClient.chat.create({
          data: {
            roomId:Number(roomId),
            userId,
            message
          } 
        })
        users.forEach(user => {
          if (user.rooms.includes(roomId)) {
            user.ws.send(JSON.stringify({
              type: "chat",
              message,
              roomId
            }));
          }
        });
      }
    
  });
});

