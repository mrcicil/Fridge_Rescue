<<<<<<< HEAD
import React, { useState } from 'react';
import IngredientInput from './components/IngredientInput';
import './App.css';
import fridgeLogo from './assets/fridge_rescue.png';

function App() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (ingredients) => {
    try {
      setLoading(true);
      setError(null);
      /*fetch api and display results*/
    } catch (err) {
      setError('Failed to fetch recipes. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="fridgeLogoimg">
        <img src={fridgeLogo} alt="Fridge Rescue" />
      </div>
      <p className="app-description">
        Reduce food waste by finding recipes with ingredients you already have!
      </p>
      
      <IngredientInput onSearch={handleSearch} />
      
      {loading && <div className="loading">Loading...</div>}
      {error && <div className="error">{error}</div>}
    </div>
  );
=======
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
import { AuthProvider } from './context/Authcontext'


function App() {


  return (
    
    <BrowserRouter>
    <AuthProvider>
    <Routes>
 
      <Route path='/' element={<Header/>}>

      <Route path='Homepage' element={<Homepage/>}/>
      <Route path='login' element={<Login></Login>}/>
      <Route path='company' element={<Company></Company>}/>
      <Route path='search' element={<Search></Search>}/>

      </Route>
     
    </Routes>

    </AuthProvider>
    </BrowserRouter>
   
    
  )
>>>>>>> main
}

export default App;