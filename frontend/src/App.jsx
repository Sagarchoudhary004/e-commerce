import { useState } from 'react'
import { Toaster } from "react-hot-toast";

import Body from './components/Body';
import './App.css'


function App() {
  const [count, setCount] = useState(0)
  

  return (
    <>
    <Body/>
    <Toaster />
    
    

    </>
  )
}

export default App
