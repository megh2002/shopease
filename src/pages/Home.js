import React, { useState, useEffect } from "react";
import axios from "axios";
import ProductList from "../components/ProductList";
import FilterSidebar from "../components/FilterSidebar";
import SortOptions from "../components/SortOptions";

const getCategories = (products) => [
  ...new Set(products.map((p) => p.category)),
];

const PRODUCTS_PER_PAGE_DESKTOP = 12;
const PRODUCTS_PER_PAGE_MOBILE = 8;

const Home = () => {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [priceRange, setPriceRange] = useState([1, 1000]);
  const [sortBy, setSortBy] = useState("popularity");
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [showFilter, setShowFilter] = useState(false);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [productsPerPage, setProductsPerPage] = useState(PRODUCTS_PER_PAGE_DESKTOP);

  useEffect(() => {
    setLoading(true);
    axios.get("https://fakestoreapi.com/products").then((res) => {
      setProducts(res.data);
      setLoading(false);
    });
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth < 768) {
        setProductsPerPage(PRODUCTS_PER_PAGE_MOBILE);
      } else {
        setProductsPerPage(PRODUCTS_PER_PAGE_DESKTOP);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter
  let filtered = products.filter((p) => {
    const inCategory = selectedCategory ? p.category === selectedCategory : true;
    const inPrice = p.price >= priceRange[0] && p.price <= priceRange[1];
    return inCategory && inPrice;
  });

  // Sort
  filtered = filtered.sort((a, b) => {
    if (sortBy === "price") return a.price - b.price;
    if (sortBy === "name") return a.title.localeCompare(b.title);
    // FakeStoreAPI does not have popularity, so use rating.count
    return (b.rating?.count || 0) - (a.rating?.count || 0);
  });

  // Pagination
  const totalPages = Math.ceil(filtered.length / productsPerPage);
  const paginated = filtered.slice(
    (page - 1) * productsPerPage,
    page * productsPerPage
  );

  // Reset page if filters change
  useEffect(() => setPage(1), [selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSelectedCategory("");
    setPriceRange([1, 1000]);
    setPage(1);
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-r from-indigo-100 via-violet-100 to-pink-100">
      <main className="py-8 px-2 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          {isSidebarVisible && (
            <div className="hidden md:block flex-shrink-0">
              <FilterSidebar
                categories={getCategories(products)}
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
                priceRange={priceRange}
                onPriceChange={setPriceRange}
                onClearFilters={clearFilters}
              />
            </div>
          )}
          {/* Main content */}
          <div className="flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-4">
              <SortOptions
                sortBy={sortBy}
                onSortChange={setSortBy}
                showFilterIcon={!isSidebarVisible}
                onFilterClick={() => setSidebarOpen(true)}
              />
            </div>
            {loading ? (
              <div className="text-center py-10 text-lg text-gray-500">Loading products...</div>
            ) : (
              <ProductList products={paginated} />
            )}
            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-6">
                <nav className="inline-flex rounded-md shadow-sm" aria-label="Pagination">
                  {Array.from({ length: totalPages }, (_, i) => (
                    <button
                      key={i}
                      onClick={() => setPage(i + 1)}
                      className={`px-4 py-2 border text-sm font-medium ${
                        page === i + 1
                          ? "bg-blue-600 text-white border-blue-600"
                          : "bg-white text-blue-600 border-gray-300 hover:bg-blue-50"
                      } first:rounded-l-md last:rounded-r-md transition`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </nav>
              </div>
            )}
          </div>
        </div>
        {/* Mobile sidebar drawer */}
        {!isSidebarVisible && (
          <div className={`fixed inset-0 z-40 bg-black/30 transition-opacity duration-300 ${sidebarOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
            onClick={() => setSidebarOpen(false)}
          />
        )}
        {!isSidebarVisible && (
          <div className={`fixed top-0 left-0 h-full z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}
            style={{ width: 288 }}
          >
            <FilterSidebar
              categories={getCategories(products)}
              selectedCategory={selectedCategory}
              onCategoryChange={setSelectedCategory}
              priceRange={priceRange}
              onPriceChange={setPriceRange}
              onClearFilters={clearFilters}
              isMobile
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />
          </div>
        )}
      </main>
    </div>
  );
};

export default Home; 