import { useState } from 'react'
import { Toaster } from "react-hot-toast";

import './App.css'
import Login from './pages/Login'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Toaster />
    <Login/>
    

    </>
  )
}

export default App
