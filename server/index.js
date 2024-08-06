import express from 'express'
import { productPromise } from './api/products.js'

const app = express()

app.get("/",(req,res)=>{
    res.send("HELLO WORLD")
})

app.get("/products",async (req,res)=>{


    const products = await productPromise()

    res.json(products)
})

app.listen(3000,()=>{
    console.log("server is listening on 3000")
})