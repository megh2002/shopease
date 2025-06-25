import React from "react";

const FilterSidebar = ({ categories, selectedCategory, onCategoryChange, priceRange, onPriceChange, isMobile, isOpen, onClose, onClearFilters }) => (
  <aside
    className={`$${isMobile ?
      `fixed top-0 left-0 h-full w-72 z-40 bg-gradient-to-br from-indigo-50 via-violet-50 to-white shadow-2xl rounded-r-3xl p-6 transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}` :
      'bg-gradient-to-br from-indigo-50 via-violet-50 to-white rounded-2xl shadow p-6 w-64 sticky top-24 h-fit'} font-sans`}
    style={{ minWidth: isMobile ? undefined : 256 }}
  >
    <div className="flex items-center justify-between mb-6">
      <h2 className="text-xl font-extrabold text-indigo-900 tracking-tight">Filters</h2>
      {isMobile && (
        <button onClick={onClose} aria-label="Close filter sidebar" className="text-violet-500 hover:text-violet-700 p-2 rounded-full transition">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
    <div className="mb-8">
      <div className="font-semibold text-indigo-800 mb-2">Category</div>
      <ul className="flex flex-col gap-2">
        <li>
          <button
            className={`w-full text-left px-3 py-2 rounded-lg font-medium transition
              ${selectedCategory === "" ? 'bg-gradient-to-r from-indigo-400 to-violet-400 text-white shadow' : 'hover:bg-indigo-100 text-indigo-800'}`}
            onClick={() => onCategoryChange("")}
          >
            All
          </button>
        </li>
        {categories.map((cat) => (
          <li key={cat}>
            <button
              className={`w-full text-left px-3 py-2 rounded-lg font-medium transition
                ${selectedCategory === cat ? 'bg-gradient-to-r from-indigo-400 to-violet-400 text-white shadow' : 'hover:bg-indigo-100 text-indigo-800'}`}
              onClick={() => onCategoryChange(cat)}
            >
              {cat}
            </button>
          </li>
        ))}
      </ul>
    </div>
    <div className="mb-8">
      <div className="font-semibold text-indigo-800 mb-2">Price</div>
      <div className="flex gap-2 items-center">
        <label htmlFor="min-price" className="sr-only">Min Price</label>
        <input
          id="min-price"
          type="number"
          className="w-20 px-2 py-1 rounded border border-violet-200 focus:ring-2 focus:ring-violet-300 outline-none"
          value={priceRange[0]}
          min={1}
          onChange={e => onPriceChange([Number(e.target.value), priceRange[1]])}
          placeholder="Min"
        />
        <span className="text-gray-400">-</span>
        <label htmlFor="max-price" className="sr-only">Max Price</label>
        <input
          id="max-price"
          type="number"
          className="w-20 px-2 py-1 rounded border border-violet-200 focus:ring-2 focus:ring-violet-300 outline-none"
          value={priceRange[1]}
          min={1}
          onChange={e => onPriceChange([priceRange[0], Number(e.target.value)])}
          placeholder="Max"
        />
      </div>
    </div>
    <button
      className="w-full bg-gradient-to-r from-indigo-500 to-violet-500 text-white py-2 rounded-xl font-bold shadow hover:from-indigo-600 hover:to-violet-600 transition text-base"
      onClick={onClearFilters}
    >
      Clear Filters
    </button>
  </aside>
);

export default FilterSidebar; 