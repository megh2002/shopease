import React from "react";
import ProductCard from "./ProductCard";

const ProductList = ({ products }) => (
  <div className="bg-gradient-to-br from-white via-indigo-50 to-violet-50 rounded-2xl p-4 sm:p-6">
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {products.map(product => (
        <div key={product.id} className="h-full">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  </div>
);

export default ProductList; 