import React from "react";

const SortOptions = ({ sortBy, onSortChange, mobile }) => (
  <div className={`flex items-center gap-2${!mobile ? " mb-4" : ""}`}>
    <label htmlFor="sort" className="font-medium">Sort by:</label>
    <select
      id="sort"
      value={sortBy}
      onChange={e => onSortChange(e.target.value)}
      className="border px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
      style={{ borderRadius: 0 }}
    >
      <option value="popularity">Popularity</option>
      <option value="price">Price</option>
      <option value="name">Name</option>
    </select>
  </div>
);

export default SortOptions; 