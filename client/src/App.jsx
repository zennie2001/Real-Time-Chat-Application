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
import { Toaster } from 'react-hot-toast'
import { useThemeStore } from './store/useThemeStore'
import ChatSmall from './components/ChatSmall'


function App() {
  const {authUser, checkAuth, isCheckingAuth, onlineUsers} = useAuthStore()
  const {theme} = useThemeStore()

  console.log(onlineUsers);
  

  useEffect(()=>{
    checkAuth()
     document.documentElement.setAttribute("data-theme", theme);
  }, [checkAuth, theme])

  console.log({authUser});

  if(isCheckingAuth && !authUser) return(
    <div className='flex items-center justify-center h-screen'>
      <Loader className="size-10 animate-spin" />
    </div>
  )
  

  return (
    <div data-theme={theme}>
      <Navbar/>

      <Routes>
        <Route path='/' element= {authUser ? <Home/> : <Navigate to="/login" />} />
        <Route path='/signup' element={!authUser ? <Signup/> : <Navigate to="/" /> } />
        <Route path='/login' element={!authUser ? <Login/> : <Navigate to="/" />} />
        <Route path='/setting' element={ <Setting/> } />
        <Route path="/chat" element={authUser ? <ChatSmall /> : <Navigate to="/login" />} />
        <Route path='/profile' element={authUser ? <Profile/> : <Navigate to="/login" />} />
      </Routes>

      <Toaster/>

    </div>
  )
}

export default App
