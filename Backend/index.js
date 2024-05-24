import express, { request, response } from "express";
import { PORT } from "./config.js";

const app = express();
app.get('/',(request,response)=>{
    console.log("MERN STACK");
    return response.status(245).send("Message with Http");
})
app.listen(PORT,()=>{
    console.log(`Listening to PORT : ${PORT}`)
})