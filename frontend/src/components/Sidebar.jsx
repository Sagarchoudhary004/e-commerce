
import { MdMenu } from "react-icons/md";
import { MdOutlineHome } from "react-icons/md";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { AiFillProduct } from "react-icons/ai";
import { BiCube } from "react-icons/bi";
import { MdAccountCircle } from "react-icons/md";
import { useState } from 'react';

export default function Sidebar() {

  const [isOpen, setOpen] = useState(false)
  let menuText;

if (isOpen) {
  menuText = <span className="text-amber-50">Menu</span>;
} else {
  menuText = null;
}

  return (
    <div className={`h-screen bg-[#061340] shadow-md  ${
    isOpen
      ? "w-[140px] sm:w-[200px]"
      : "w-[60px] sm:w-[70px]"
  }`}>
      <div>
        <header>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpen(pre => !pre); 
            }}
            className='flex items-center gap-5 pl-4 pt-5 cursor-pointer'>
            <MdMenu color="white" size={30} />
            {menuText}
             
            {/* AGAR YE IF ELSE SE NA KENA HO TO COMMENT BALE PART SE BHI KR SKTE H US ME EASY H */}


            {/* {isOpen && (
              <span className="text-amber-50">Menu</span>
            )} */}
          </button>


        </header>

        <Link
          to="/browse"
          className="flex items-center gap-5 mt-5 pl-4"
        >
          <MdOutlineHome color="white" size={30} />

          {isOpen && (
            <span className="text-amber-50">Home</span>
          )}
        </Link>

        <Link
        to= ""
        className='flex items-center gap-5 mt-5 pl-4'>
          <AiFillProduct color="white" size={30} />
          {isOpen && (
            <span className="text-amber-50">Products</span>
          )}
        </Link>

        <Link
        to =""
         className='flex items-center gap-5 mt-5 pl-4'>
          <FaShoppingCart color="white" size={30} />
          {isOpen && (
            <span className="text-amber-50">Cart</span>
          )}
        </Link>

        <Link
        to =""
         className='flex items-center gap-5 mt-5 pl-4'>
          <BiCube color="white" size={30} />
          {isOpen && (
            <span className="text-amber-50">Orders</span>
          )}
        </Link>
        <Link
        to =""
        className='flex items-center gap-5 mt-5 pl-4 '>
          <MdAccountCircle color="white" size={30} />
         {isOpen && (
            <span className="text-amber-50">Account</span>
          )}

        </Link>
      </div>
    </div>
  )
}
