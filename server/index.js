import express from 'express'
import { productPromise } from './api/products.js'
import { Redis } from 'ioredis'
import dotenv from "dotenv"
import { addorder, orderPromise } from './api/order.js'
import { deleteCachedData, getCachedData } from './middleware/redis.js'
dotenv.config()

const app = express()

export const redis = new Redis({
    host: process.env.REDIS_HOST,
    port: process.env.REDIS_PORT,
    password: process.env.REDIS_PASSWORD
})


redis.on("connect",()=>{
    console.log("redis connected")
})

app.use(express.json())

app.get("/",(req,res)=>{
    res.send("HELLO WORLD")
})

app.get("/products", getCachedData("products"),async (req,res)=>{

    const products = await productPromise()
    await redis.setex("products",20,JSON.stringify(products.products))
    return res.json(products)
})

app.post("/addorder",deleteCachedData("order"),async (req,res)=>{
    const {order} = req.body
    
    addorder(order)
    
    return res.json("ordered") 
})

app.get("/getorder", getCachedData("order"),async (req,res)=>{

    const order = await orderPromise()
    await redis.setex("order",15,JSON.stringify(order.order))
    return res.json(order)
})



app.listen(3000,()=>{
    console.log("server is listening on 3000")
})