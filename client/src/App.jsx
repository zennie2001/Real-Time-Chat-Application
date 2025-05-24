import { useState } from 'react'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/LOgin'
import Setting from './pages/Setting'
import Profile from './pages/Profile'
import { useAuthStore } from './store/useAuthStore'
import { useEffect } from 'react'
import {Loader} from "lucide-react"

function App() {
  const {authUser, checkAuth, isCheckingAuth} = useAuthStore()

  useEffect(()=>{
    checkAuth()
  }, [checkAuth])

  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element= {authUser ? <Home/> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/" /> } />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/login" />} />
        <Route path='/setting' element={ <Setting/> } />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />} />
      </Routes>

    </div>
  )
}

export default App
