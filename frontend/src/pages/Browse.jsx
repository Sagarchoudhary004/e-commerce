import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CartContext from '../context/CartContext';

export default function Browse() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    axios.get('http://localhost:8000/api/v1/product/getProducts')
      .then((response) => setProducts(response.data.products || []))
      .catch((error) => {
        console.error('Error fetching products:', error);
        toast.error('Unable to load products.');
      });
  }, []);

  return <section className="min-h-[calc(100vh-64px)] p-6">
    <h1 className="text-2xl font-bold">Browse Products</h1>
    {products.length === 0 ? <p className="mt-6 text-gray-500">No products found.</p> :
      <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((product) => <article key={product._id} className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm">
          <button className="w-full text-left" onClick={() => navigate(`/product/${product._id}`)}>
            <img src={product.image} alt={product.productName} className="h-48 w-full object-contain" />
            <h2 className="mt-3 font-semibold text-gray-900">{product.productName}</h2>
            <p className="mt-1 font-semibold text-green-700">₹{Number(product.price).toLocaleString('en-IN')}</p>
          </button>
          <button disabled={product.stock <= 0} onClick={() => { addToCart(product); toast.success('Added to cart'); }} className="mt-4 w-full rounded-lg bg-blue-600 px-4 py-2.5 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-400">
            {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
          </button>
        </article>)}
      </div>}
  </section>;
}
