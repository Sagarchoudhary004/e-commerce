import React from "react";
import logo from "../assets/loho.png";
import { FiSearch, FiHeart, FiShoppingCart, FiMenu } from "react-icons/fi";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-md">
      <div className="flex items-center justify-between gap-3 px-4 py-3 sm:gap-5 sm:px-6 lg:px-8">

        {/* Logo */}
        <div className="flex shrink-0 items-center">
          <img
            className="h-auto w-[125px] cursor-pointer sm:w-[160px] lg:w-[190px]"
            src={logo}
            alt="ShopeMate logo"
          />
        </div>

        {/* Search Bar */}
        <div className="flex min-w-0 flex-1 items-center rounded-full border border-gray-300 bg-gray-50 px-3 py-2 transition
         focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-100 sm:max-w-2xl sm:px-4">
          <FiSearch className="shrink-0 text-gray-500" size={21} />

          <input
            type="text"
            placeholder="Search products..."
            className="ml-2 min-w-0 flex-1 bg-transparent text-sm text-gray-800 outline-none placeholder:text-gray-400 sm:text-base"
          />
        </div>

        {/* Action Icons */}
        
        <div className="flex shrink-0 items-center gap-3 sm:gap-5 lg:gap-7">
          <Link
        to="/like">
          <button
            type="button"
            aria-label="Wishlist"
            className="text-gray-700 transition hover:scale-110 hover:text-blue-600"
          >
            <FiHeart size={23} />
          </button>
          </Link>
          <Link 
          to="/cart">
          <button
            type="button"
            aria-label="Shopping cart"
            className="text-gray-700 transition hover:scale-110 hover:text-blue-600"
          >
            <FiShoppingCart size={23} />
          </button>
          </Link>

          {/* Mobile menu — Sidebar later connect karenge */}
          {/* <button
            type="button"
            aria-label="Open menu"
            className="text-gray-700 transition hover:text-blue-600 lg:hidden"
          >
            <FiMenu size={24} />
          </button> */}

        </div>
      </div>
    </header>
  );
}

