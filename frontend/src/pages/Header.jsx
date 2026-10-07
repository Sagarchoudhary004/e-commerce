import React from 'react'
import logo from '../assets/loho.png'
import { FiSearch, FiHeart, FiShoppingCart } from "react-icons/fi";

export default function Header() {
  return (
    <div className='flex flex-wrap items-center justify-between px-4 sm:px-8 bg-gradient-to-b from-black'>
        <img className='cursor-pointer w-38 sm:w-45' src={logo} alt="logo image" />
        <FiSearch size={30}/>
<FiHeart size={30} />
<FiShoppingCart size={30} />
    </div>
  )
}
