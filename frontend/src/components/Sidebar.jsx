import React from 'react'
import { MdMenu } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";

import { AiFillProduct } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { useState } from 'react';

export default function Sidebar() {

  

  return (
    <div className=" left-0 top-0 h-screen w-[250px] bg-[#061340] shadow-md ">
      <div>
        <header>
          <a href="" className='flex items-center gap-5 pl-4 pt-5'>
            <MdMenu color="white" size={30} />
            <span className='text-amber-50'>Menu</span>
          </a>


        </header>
        <a href="/browse" className='flex items-center gap-5 mt-5 pl-4'>
          <MdOutlineHome color="white" size={30} />
          <span className='text-amber-50'>Home</span>
        </a>
        <a href="" className='flex items-center gap-5 mt-5 pl-4'>
          <AiFillProduct color="white" size={30} />
          <span className='text-amber-50'>Products</span>
        </a>

        <a href="" className='flex items-center gap-5 mt-5 pl-4'>
          <FaShoppingCart color="white" size={30} />
          <span className='text-amber-50'>Cart</span>
        </a>

        <a href=""  className='flex items-center gap-5 mt-5 pl-4'>
          <BiCube color="white" size={30} />
          <span className='text-amber-50'>Orders</span>
        </a>
        <a href="" className='flex items-center gap-5 mt-5 pl-4 '>
          <MdAccountCircle color="white" size={30} />
          <span className='text-amber-50'>Account</span>

        </a>
      </div>
    </div>
  )
}
