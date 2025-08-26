import express from 'express';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '@repo/backend-common/config';
import { middleware } from './middleware';
import {CreateUserSchema,SigninSchema,CreateRoomSchema} from '@repo/common/types';
import { prismaClient } from '@repo/db/client';
import cors from 'cors';

const app = express();
app.use(express.json())
app.use(cors())

app.post("/signup", async(req, res) => {
    const parsedData= CreateUserSchema.safeParse(req.body)
    console.log(req.body)
    console.log(parsedData)
    if (!parsedData.success) {
        res.status(400).json({
            message:"Invalid data",
            
        })
        return
    }
        

    try {
        const user=await prismaClient.user.create({
        
            data:{
                email:parsedData.data.username,
                password:parsedData.data.password,
                name:parsedData.data.name,
                }
            })
        

    res.json({
        userId:user.id,
    })
    }catch (error) {
        res.status(500).json({
            message:"Internal server error",
        }
            
        )
    }

})

app.post("/signin", async(req, res) => {
    const parsedData=SigninSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            message:"Invalid data",
            
        })
        return
    }
    const user= await prismaClient.user.findFirst({
        where:{
            email:parsedData.data.username,
            password:parsedData.data.password
        }
    })
    if (!user) {
        res.status(401).json({
            message:"Invalid credentials",
            
        })
        return
    }


    const token=jwt.sign({
        userId:user?.id,
    },JWT_SECRET)
    res.json({
        token
    })

})

app.post("/room",middleware,async(req, res) => {
    const parsedData=CreateRoomSchema.safeParse(req.body)
    if (!parsedData.success) {
        res.status(400).json({
            message:"Invalid data",
            
        })
        return
    }
    //@ts-ignore
    const userId=req.userId
    try{
        const room=await prismaClient.room.create({
            data:{
                slug:parsedData.data.name,
                adminId:userId,}
            })
    
        res.json({
            roomId:room.id,
        })
    }catch (error) {
        res.status(500).json({
            message:"Internal server error",
        })
    }
    
})

app.get("/chats/:roomId",async(req, res) => {
    console.log("here")
    try {
        const roomId=Number(req.params.roomId)
    const messages=await prismaClient.chat.findMany({
        where:{
            roomId
        },orderBy:{
            id:"desc"
        },take:10

    })
    res.json({
        
        messages
    })
    console.log(messages)
    }catch (error) {
        res.status(500).json({
            messsages:[]
        })
    }

})


app.get("/room/:slug",async(req, res) => {
    console.log("here from slug side")
    try{
        const slug=req.params.slug
            const room=await prismaClient.room.findFirst({
            where:{
            slug
            }
        })
        res.json({
            
            room
        })
        console.log(room)    
    }catch (error) {        
        res.status(500).json({
            message:"Internal server error",
        })
    }
            
   

})
app.listen(3005)