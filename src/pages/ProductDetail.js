import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import axios from "axios";

// Helper to PascalCase with special handling for apostrophe-s
function toPascalCaseWithApostrophe(str) {
  return str
    .split(' ')
    .map(word => {
      if (word.toLowerCase().endsWith("'s")) {
        // Capitalize first letter, keep 's lowercase
        return word.charAt(0).toUpperCase() + word.slice(1, -2).toLowerCase() + "'s";
      }
      return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    })
    .join(' ');
}

const ProductDetail = () => {
  const { id } = useParams();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`https://fakestoreapi.com/products/${id}`).then((res) => {
      setProduct(res.data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="text-center py-10">Loading product...</div>;
  if (!product) return <div className="text-center py-10">Product not found.</div>;

  const handleAddToCart = () => {
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-100 via-violet-100 to-pink-100 flex items-center justify-center py-12">
      <div className="max-w-3xl w-full bg-white/90 rounded-3xl shadow-2xl p-10 flex flex-col md:flex-row gap-10 border border-violet-100">
        <div className="flex-1 flex items-center justify-center">
          <img src={product.image} alt={product.title} className="h-64 w-64 object-contain drop-shadow" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="text-3xl font-extrabold text-indigo-900 mb-2">{product.title}</div>
          <div className="text-lg text-violet-600 font-semibold mb-1">{toPascalCaseWithApostrophe(product.category)}</div>
          <div className="flex items-center gap-4 mb-2">
            <span className="inline-block bg-emerald-200 text-emerald-700 font-bold text-sm px-3 py-1 rounded-full shadow">★ {product.rating.rate}</span>
            <span className="text-2xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
          </div>
          <div className="text-gray-700 mb-4">{product.description}</div>
          <button
            className="mt-2 w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-3 rounded-xl font-bold shadow hover:from-indigo-600 hover:to-violet-600 transition text-lg"
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 