import React from 'react'
import Header from "./Header"
import Sidebar from "../components/Sidebar"
import { useEffect, useState } from 'react'
import axios from 'axios'

export default function Browse() {

  const [products, setproducts] = useState([]);
  return (


    <div>
      <Header />
      <Sidebar />
      <div>
        browse
      </div>
    </div>
  )
}
