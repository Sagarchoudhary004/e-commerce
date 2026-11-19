import React from 'react'
import { useContext } from 'react'
import orderContext from '../context/orderContext'

export default function Checkout() {

  const {setCheckoutItems} = useContext(orderContext)
  return (
    <div>Checkout</div>
  )
}
