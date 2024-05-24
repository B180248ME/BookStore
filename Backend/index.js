import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();
app.get('/',(request,response)=>{
    console.log("MERN STACK");
    return response.status(245).send("Message with Http");
})


mongoose
    .connect(MongoDBURL)
    .then(()=>{
        console.log("app successfully connted to MongoDB database");
        app.listen(PORT,()=>{
            console.log(`Listening to PORT : ${PORT}`);
        })
    })
    .catch((error)=>{
        console.error("ALERT ERROR !!" ,error);
    })
