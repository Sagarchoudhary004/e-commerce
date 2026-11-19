import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import CartContextProvider from './context/CartContextProvider.jsx'
import OrderContextProvider from './context/OrderContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <OrderContextProvider>
    <CartContextProvider>
    <App />
    </CartContextProvider>
    </OrderContextProvider>
  </StrictMode>,
)
