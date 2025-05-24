import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Home from './pages/Home'
import Navbar from './components/Navbar'
import { Route, Routes } from 'react-router-dom'
import Signup from './pages/Signup'
import Login from './pages/LOgin'
import Setting from './pages/Setting'
import Profile from './pages/Profile'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <Navbar/>

      <Routes>
        <Route path='/' element= {<Home/>} />
        <Route path='/signup' element={<Signup/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/setting' element={<Setting/>} />
        <Route path='/profile' element={<Profile/>} />
      </Routes>

    </div>
  )
}

export default App
