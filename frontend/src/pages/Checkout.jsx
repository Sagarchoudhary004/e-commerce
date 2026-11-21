import React from 'react'
import { useContext } from 'react'
import orderContext from '../context/orderContext'

export default function Checkout() {

  const {checkoutItems} = useContext(orderContext)
  console.log(checkoutItems);
  return (
    
    <>
    <div>Checkout</div>
    
    </>
  )
}
