import express, { request, response } from "express";
import { PORT, MongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const app = express();
app.use(express.json())

app.get('/',(request,response)=>{
    console.log("MERN STACK");
    return response.status(245).send("Message with Http");
})

// Add Book to database
app.post('/books',async(request,response)=>{
    try{
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ) {
            return response.status(400).send({message:'Please give all the requied fields: title, author, publishYear'})
        }
        const newBook = {
            title:request.body.title,
            author:request.body.author,
            publishYear:request.body.publishYear
        }
        const book = await Book.create(newBook);
        return response.status(201).send({message: "added book successfully",book})
    }
    catch(error){
        console.error("ERROR ADDING NEW BOOK!!" ,error.message);
        return response.status(400).send({message:error.message});
    }
});

// Get all the books from database
app.get('/books',async(request,response)=>{
    try{
        const books = await Book.find({});
        return response.status(200).json({
            count : books.length,
            data : books
        });
    }
    catch(error){
        console.error("ERROR FINDING ALL BOOKS!!" ,error.message);
        return response.status(500).send({message:error.message});
    }
})

// Get Details of a Book
app.get('/books/:id',async(request,response)=>{
    try{
        const { id } = request.params;
        const book = await Book.findById(id);
        return response.status(200).json({
            book
        });
    }
    catch(error){
        console.error("ERROR FINDING BOOK!!" ,error.message);
        return response.status(500).send({message:error.message});
    }
})

// Update a Book 
app.put('/books/:id',async(request,response)=>{
    try{
        if(
            !request.body.title || !request.body.author || !request.body.publishYear
        ) {
            return response.status(400).send({message:'Please give all the requied fields: title, author, publishYear'})
        }
        const { id } = request.params;
        const result = await Book.findByIdAndUpdate(id,request.body);
        console.log(result);
        if(!result){
            return response.status(404).json({message:"Error in Finding the book"})
        }
        return response.status(200).send({message:"Book updated Successfully"})
    }
    catch(error){
        console.error("ERROR UPDATING BOOK!!" ,error.message);
        return response.status(500).send({message:error.message});
    }
})

// Delete a Book
app.delete('/books/:id',async(request,response)=>{
    try{
        const { id } = request.params;
        const result = await Book.findByIdAndDelete(id);
        console.log(result);
        if(!result){
            return response.status(404).json({message:"Error in Finding the book"})
        }
        return response.status(200).send({message:"Book deleted Successfully"})
    }
    catch(error){
        console.error("ERROR DELETING BOOK!!" ,error.message);
        return response.status(500).send({message:error.message});
    }
})
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


