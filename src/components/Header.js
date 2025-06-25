import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Header = () => {
  const { items } = useCart();
  const cartCount = items.length;
  return (
    <header className="bg-gradient-to-r from-indigo-100 via-violet-100 to-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between py-4 px-2 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent tracking-tight drop-shadow-sm">ShopEase</span>
        </Link>
        <nav className="flex gap-6 text-lg font-medium">
          <Link to="/cart" className="hover:text-violet-600 transition flex items-center gap-1 relative group">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-7 h-7 group-hover:scale-110 group-hover:text-indigo-500 transition-transform">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 9V6.75A4.5 4.5 0 008 6.75V9m-3.25 0h14.5c.414 0 .75.336.75.75v8.25a2.25 2.25 0 01-2.25 2.25H6.25A2.25 2.25 0 014 18V9.75c0-.414.336-.75.75-.75z" />
            </svg>
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-3 bg-gradient-to-r from-pink-500 to-violet-500 text-white text-xs rounded-full px-2 py-0.5 font-bold shadow">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      </div>
    </header>
  );
};

export default Header; 