import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Homepage from './routes/Homepage'
import Login from './routes/Login'
import Company from './routes/Company'
import Header from './routes/Header'
import Search from './routes/Search'
import Result from './routes/result'
// import RecipeDetail from './routes/RecipeDetail'


import { AuthProvider } from './context/Authcontext'



function App() {


  return (
    
    <BrowserRouter>
    <AuthProvider>
      {/* <Header /> */}
    <Routes>
 
      <Route path='/' element={<Header/>}>

      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/company' element={<Company></Company>}/>
      <Route path='/search' element={<Search></Search>}/>
       <Route path='result' element={<Result/>}/>


      </Route>
     
    </Routes>
  

    </AuthProvider>
    </BrowserRouter>
   
    
  )
}

export default App
