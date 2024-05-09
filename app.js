import express from "express";
import { config } from "dotenv";
import cors from 'cors'


config({path:"./Config/Config.js"})


export const app = express();
import router from "./Routes/Router.js";


app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


app.use('/api', router)
app.get("/api/getkey", (req,res)=>{
    res.status(200).json({key: process.env.RAZORPAY_API_KEY})
})