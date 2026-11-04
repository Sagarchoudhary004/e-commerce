import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import CartContext from '../context/CartContext';

export default function Cart() {
  const { cart, removeFromCart, updateQuantity } = useContext(CartContext);
  const subtotal = cart.reduce((total, item) => total + Number(item.price) * item.quantity, 0);

  if (cart.length === 0) {
    return <section className="mx-auto max-w-4xl px-6 py-16 text-center">
      <h1 className="text-3xl font-bold text-gray-900">Your cart is empty</h1>
      <p className="mt-3 text-gray-600">Browse products and add something you like.</p>
      <Link to="/browse" className="mt-6 inline-block rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Browse products</Link>
    </section>;
  }

  return <section className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
    <h1 className="mb-6 text-3xl font-bold text-gray-900">Shopping Cart</h1>
    <div className="space-y-4">
      {cart.map((item) => <article key={item._id} className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center">
        <img src={item.image} alt={item.productName} className="h-28 w-28 rounded-lg bg-gray-50 object-contain" />
        <div className="min-w-0 flex-1">
          <h2 className="text-lg font-semibold text-gray-900">{item.productName}</h2>
          <p className="mt-1 font-semibold text-green-700">₹{Number(item.price).toLocaleString('en-IN')}</p>
        </div>
        <div className="flex items-center gap-3">
          <label htmlFor={`quantity-${item._id}`} className="text-sm text-gray-600">Qty</label>
          <input id={`quantity-${item._id}`} type="number" min="1" max={item.stock || undefined} value={item.quantity} onChange={(event) => updateQuantity(item._id, Number(event.target.value))} className="w-20 rounded-md border border-gray-300 px-2 py-1.5" />
        </div>
        <button onClick={() => removeFromCart(item._id)} className="text-sm font-medium text-red-600 hover:text-red-800">Remove</button>
      </article>)}
    </div>
    <div className="mt-8 flex flex-col items-end gap-4 border-t border-gray-200 pt-5">
      <p className="text-xl font-bold text-gray-900">Subtotal: ₹{subtotal.toLocaleString('en-IN')}</p>
      <Link to="/browse" className="rounded-lg bg-blue-600 px-5 py-3 font-semibold text-white hover:bg-blue-700">Continue shopping</Link>
    </div>
  </section>;
}
