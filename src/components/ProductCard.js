import React from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";

const ProductCard = ({ product }) => {
  return (
    <Link to={`/product/${product.id}`} className="block group h-full" role="listitem">
      <div className="bg-gradient-to-br from-indigo-200 via-violet-200 to-white rounded-2xl shadow-lg flex flex-col h-full transition-transform group-hover:scale-[1.025] group-hover:shadow-2xl group-hover:ring-2 group-hover:ring-violet-200">
        <div className="flex-1 flex items-center justify-center p-3">
          <div className="bg-white rounded-xl shadow-md flex items-center justify-center w-32 h-32 sm:w-36 sm:h-36">
            <img src={product.image} alt={`Product: ${product.title}`} className="h-24 w-24 sm:h-28 sm:w-28 object-contain" />
          </div>
        </div>
        <div className="px-5 pb-5 pt-2 flex flex-col gap-2">
          <div className="font-bold text-lg text-indigo-900 truncate">{product.title}</div>
          <div className="text-sm text-violet-600 font-medium mb-1">{product.category}</div>
          <div className="flex items-center justify-between mt-2">
            <span className="inline-block bg-emerald-200 text-emerald-700 font-bold text-xs px-2 py-1 rounded-full shadow">★ {product.rating.rate}</span>
            <span className="text-xl font-extrabold bg-gradient-to-r from-indigo-600 to-violet-600 bg-clip-text text-transparent">${product.price.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    title: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    rating: PropTypes.shape({
      rate: PropTypes.number.isRequired,
      count: PropTypes.number
    }).isRequired,
    category: PropTypes.string.isRequired
  }).isRequired
};

export default ProductCard; 