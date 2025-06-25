import React from "react";
import { useCart } from "../context/CartContext";

const Cart = () => {
  const { items, updateQuantity, removeFromCart, clearCart } = useCart();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-100 via-violet-100 to-pink-100 flex items-center justify-center py-8 px-2">
      <div className="w-full max-w-3xl bg-white/90 rounded-2xl shadow-2xl p-4 sm:p-8 border border-violet-100">
        <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-900 mb-6 tracking-tight">Your Cart</h1>
        {items.length === 0 ? (
          <div className="text-gray-500 text-center py-10 text-base sm:text-lg font-medium">
            Your cart is empty.
          </div>
        ) : (
          <>
            <ul className="mb-8 flex flex-col gap-y-5">
              {items.map(({ product, quantity }) => (
                <li key={product.id} className="flex flex-row flex-wrap items-center gap-2 sm:gap-4 bg-white/80 rounded-xl shadow p-2 sm:p-4 border border-violet-50">
                  <img src={product.image} alt={product.title} className="w-14 h-14 sm:w-16 sm:h-16 object-contain rounded shadow bg-gradient-to-br from-indigo-100 to-violet-100 flex-shrink-0" />
                  <div className="flex-1 min-w-0">
                    <div className="font-bold text-sm sm:text-lg text-indigo-900 truncate max-w-[120px] sm:max-w-none">{product.title}</div>
                    <div className="text-violet-600 font-bold text-sm sm:text-base">${product.price.toFixed(2)}</div>
                  </div>
                  <div className="flex items-center gap-1 sm:gap-2">
                    <button
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 font-bold"
                      onClick={() => updateQuantity(product.id, Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <span className="px-2 font-semibold text-indigo-900">{quantity}</span>
                    <button
                      className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded hover:bg-indigo-200 font-bold"
                      onClick={() => updateQuantity(product.id, quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                  <button
                    className="ml-0 sm:ml-4 p-2 rounded-full transition hover:bg-violet-100"
                    onClick={() => removeFromCart(product.id)}
                    aria-label="Delete"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-6 h-6 text-violet-400">
                      <path d="M6 19a2 2 0 002 2h8a2 2 0 002-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z" />
                    </svg>
                  </button>
                </li>
              ))}
            </ul>
            <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-2 sm:gap-0">
              <div className="text-xl sm:text-2xl font-bold text-indigo-900">Total:</div>
              <div className="text-2xl sm:text-3xl bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent font-extrabold">${total.toFixed(2)}</div>
            </div>
            <button
              className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-bold shadow hover:from-indigo-600 hover:to-violet-600 transition text-base sm:text-lg"
              onClick={clearCart}
            >
              Clear Cart
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Cart; 