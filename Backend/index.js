import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.get('/',(request,response)=>{
    console.log("MERN STACK");
    return response.status(245).send("Message with Http");
})

// For New Book
app.post('/books',async(request,response)=>{
    try{
        if(
            !request.body.title || request.body.author || request.body.publishYear
        ) {
            return response.status(400).send({message:'Please give all the requied fields: title, author, publishYear'})
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send({message: "added book successfully"},book)
    }
    catch(error){
        console.error("ERROR ADDING NEW BOOK!!" ,error.message);
        return response.status(400).send({message:error.message});
    }
});

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


