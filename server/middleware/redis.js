import { redis } from "../index.js";

export const getCachedData = (key) => async (req,res,next) => {
    let data = await redis.get(key)
        
    if(data){
        return res.json({key:JSON.parse(data)})
    }

    next();
}

export const deleteCachedData = (key) => async (req,res,next) => {
    await redis.del(key)
    next();
}