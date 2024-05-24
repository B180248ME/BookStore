import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";
import router from "./routes/booksRoute.js";

const app = express();
// Like Middleware to parse request body in json
app.use(express.json())

app.get('/',(request,response)=>{
    console.log("MERN STACK");
    return response.status(245).send("Message with Http");
})

app.use('/books',router);

// Connect to MongoDB database
mongoose
    .connect(MongoDBURL)
    .then(()=>{
        console.log("app successfully connected to MongoDB database");
        app.listen(PORT,()=>{
            console.log(`Listening to PORT : ${PORT}`);
        })
    })
    .catch((error)=>{
        console.error("ALERT ERROR !!" ,error);
    })


