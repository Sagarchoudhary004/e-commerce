import React from 'react'

import { useEffect, useState } from 'react'
import axios from "axios"
import { useNavigate } from 'react-router-dom';



export default function Browse() {
  const [products, setproducts] = useState([]);
  // const nevigate = useNavigate()
  const navigate = useNavigate();

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

      <div className="h-[calc(100vh-64px)] overflow-y-auto p-6">
        <h1 className="text-2xl font-bold">
          Browse Products
        </h1>
        <div className="grid grid-cols-2 gap-15">
          {
            products.map((product) => {
              return (
                <div key={product._id}>
                  
                  <button onClick={()=>navigate(`/product/${product._id}`)}>
                    
                  <h2>{product.productName}</h2>
                  <p>₹{product.price}</p>
                  <img
                    src={product.image}
                    alt={product.productName}
                    className="h-48 w-48 object-cover"
                  />
                  </button>
                </div>
              )
            })
          }
        </div>
      </div>

    </div>
  )
}
