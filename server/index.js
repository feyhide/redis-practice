import express from 'express'
import { productPromise } from './api/products.js'
import { Redis } from 'ioredis'
import dotenv from "dotenv"
import { addorder, orderPromise } from './api/order.js'
dotenv.config()

const app = express()

const redis = new Redis({
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

app.get("/products",async (req,res)=>{
    
    let products = await redis.get("products")
        
    if(products){
        return res.json({products:JSON.parse(products)})
    }

    products = await productPromise()
    await redis.setex("products",20,JSON.stringify(products.products))
    res.json(products)
})

app.post("/addorder",async (req,res)=>{
    const {order} = req.body
    
    addorder(order)
    await redis.del("order")
    
    res.json("ordered") 
})

app.get("/getorder",async (req,res)=>{
    let order = await redis.get("order")
        
    if(order){
        return res.json({order:JSON.parse(order)})
    }

    order = await orderPromise()
    await redis.setex("order",15,JSON.stringify(order.order))
    res.json(order)
})



app.listen(3000,()=>{
    console.log("server is listening on 3000")
})