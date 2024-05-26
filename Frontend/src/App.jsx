import React from 'react'
import {Routes,Route} from 'react-router-dom'
import CreateBooks from './pages/CreateBooks'
import DeleteBooks from './pages/DeleteBooks'
import EditBooks from './pages/EditBooks'
import Home from './pages/Home'
import ShowBook from './pages/ShowBook'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/books/create' element={<CreateBooks/>}/>
      <Route path='/book/details/:id' element={<ShowBook/>}/>
      <Route path='/book/edit/:id' element={<EditBooks/>}/>
      <Route path='/book/delete/:id' element={<DeleteBooks/>}/>
    </Routes>
  )
}

export default App