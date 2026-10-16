import React from 'react'

import { useEffect, useState } from 'react'
import axios from "axios"


export default function Browse() {
  const [products, setproducts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/api/v1/product/getProducts")
      .then((response) => {
        console.log("Full response:", response.data);
  console.log("Products:", response.data.products);
        setproducts(response.data.products);
        
      })
      .catch((error) => {
        console.log("Error fetching products:", error);
      });
  }, []);
  return (


    <div>

      <div className='h-[calc(100vh-64px)] overflow-y-auto'>
        browse
      </div>
    </div>
  )
}
