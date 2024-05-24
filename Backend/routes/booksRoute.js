import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Add Book to database
router.post('/',async(request,response)=>{
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
router.get('/',async(request,response)=>{
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
router.get('/:id',async(request,response)=>{
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
router.put('/:id',async(request,response)=>{
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
router.delete('/:id',async(request,response)=>{
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
        console.error("ERROR DELETING BOOK!!",error.message);
        return response.status(500).send({message:error.message});
    }
})

export default router;