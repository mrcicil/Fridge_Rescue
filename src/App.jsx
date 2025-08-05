import './App.css'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Homepage from './routes/Homepage'
import Login from './routes/Login'
import Team from './routes/Team'
import Header from './routes/Header'
import Search from './routes/Search'
import Result from './routes/Result'
import Register from './routes/Register'
import Confirmation from './routes/Confirmation'
import ProtectedRoute from './routes/ProtectedRoute'
import Profile from './routes/Profile'
import ProfileEdit from './routes/ProfileEdit'
import Userlist from './routes/Userlist'
import ErrorPage from './routes/ErrorPage'
import { AuthProvider } from './context/Authcontext'
import { RecipeProvider } from './context/RecipeContext'

function App() {

  return (
    <RecipeProvider>
    <BrowserRouter>
    <AuthProvider>
    
    <Header />
    <Routes>
    
       {/* Add redirect from root to homepage */}
      <Route index element={<Navigate to="/homepage" replace />} />
      <Route path='/homepage' element={<Homepage/>}/>
      <Route path='/login' element={<Login></Login>}/>
      <Route path='/team' element={<Team></Team>}/>
       <Route path='/register' element={<Register/>}/>

      {/* Rahmat - Add protected route so that user cant directly go to search and will be landed on login page */}
      <Route path='/search' element={
         <ProtectedRoute>
        <Search />
         </ProtectedRoute>
         }/>

         {/* Use protected route for register
         <Route path='/register' element={
         <ProtectedRoute>
        <Register />
         </ProtectedRoute>
         }/> */}
      
      {/* TRISHA - Changed this route path so that clicking on result card leads to Caleb's detail page */}
      {/* Rahmat - Add protected route here also as noticed if user use /recipe/id they are able to bypass it as well */}
      <Route path="/recipe/:id" element={
        <ProtectedRoute>
        <Result/>
        </ProtectedRoute>
        } />

        <Route path="/confirm/:id" element={<Confirmation/>} />
        <Route path="/profile" element={<Profile/>} />
        <Route path="/profileEdit" element={<ProfileEdit/>} />
        <Route path="/userlist" element={<Userlist/>} />
        <Route path="*" element={<ErrorPage/>}/>

    </Routes>
        
    </AuthProvider> 
    </BrowserRouter>
    </RecipeProvider>
   
  )
}

export default App
