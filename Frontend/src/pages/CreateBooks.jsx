import React, { useEffect, useState } from 'react'
import Spinner from '../components/Spinner';
import BackButton from '../components/BackButtom';
import axios from 'axios';

const CreateBooks = () => {
    const [book, setBook] = useState([]);
    const [loading, setLoading] = useState(false);
    const {id} = useParams();
  
    useEffect(()=>{
      setLoading(true);
      axios
         .get(`http://localhost:5555/books/${id}`)
         .then((response)=>{
          setBook(response.data.book);
          setLoading(false);
         })
         .catch((error)=>{
          console.log("Error in loading the datails of book",error);
          setLoading(false);
         })
    },[])
  return (
    <div>CreateBooks</div>
  )
}

export default CreateBooks