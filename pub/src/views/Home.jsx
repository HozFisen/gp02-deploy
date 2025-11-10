// src/views/Home.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Card from '../components/Card';

// API URLs
const API_URL = 'https://api.p2.gc01aio.foxhub.space/apis/pub/products/products';
const CATEGORY_API_URL = 'https://api.p2.gc01aio.foxhub.space/apis/pub/products/categories'; // New

const Home = () => {
  // --- State ---
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [categories, setCategories] = useState([]); // New: For dynamic categories
  const [sortOrder, setSortOrder] = useState('ASC'); // New: 'asc' or 'desc'

  // --- Utility Functions ---
  const pages = generatePages();

  function generatePages() {
    const array = [];
    for (let i = 1; i <= totalPage; i++) {
      array.push(i);
    }
    return array;
  }

  function handlePages(page) {
    setCurrentPage(page);
  }

  function handlePrevious() {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  }

  function handleNext() {
    if (currentPage < totalPage) {
      setCurrentPage(currentPage + 1);
    }
  }

  // --- Data Fetching (Products) ---
  const fetchProducts = async () => {
    try {
      setLoading(true);
      setError(null);

      // Build dynamic params
      const params = new URLSearchParams();
      params.append('page', currentPage);
      params.append('limit', 12);
      if (searchTerm) {
        params.append('q', searchTerm);
      }
      if (categoryFilter !== 'all') {
        params.append('i', categoryFilter);
      }

      // New: Add sorting parameters based on name
      // params.append('sortBy', 'name');
      params.append('sort', sortOrder);

      const response = await axios.get(`${API_URL}?${params.toString()}`);

      // Set state from API response
      setProducts(response.data.data);
      setCurrentPage(response.data.meta.page);
      setTotalPage(response.data.meta.totalPages);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  // --- Data Fetching (Categories - New) ---
  useEffect(() => {
    const fetchCategories = async () => {
        try {
            const response = await axios.get(CATEGORY_API_URL);
            // Assuming the category API returns an array of objects with { id, name }
            // Filter out any categories where 'name' is not available or null
            const validCategories = response.data.data.filter(cat => cat.name);
            setCategories(validCategories);
        } catch (err) {
            // Silently handle category fetch error
            console.error("Failed to fetch categories:", err);
        }
    };
    fetchCategories();
  }, []); // Run only on mount

  // --- Primary Data Effect ---
  // Re-fetch data when page, search, filter, or sortOrder changes
  useEffect(() => {
    fetchProducts();
  }, [currentPage, searchTerm, categoryFilter, sortOrder]); // sortOrder is a new dependency

  // --- Event Handlers ---
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  const handleCategoryChange = (e) => {
    setCategoryFilter(e.target.value);
    setCurrentPage(1); // Reset to page 1
  };

  // New Sort Handler
  const handleSortToggle = () => {
    const newSortOrder = sortOrder === 'ASC' ? 'DESC' : 'ASC';
    setSortOrder(newSortOrder);
    setCurrentPage(1); // Reset to page 1 for new sort
  };


  // --- Render Loading State (Original Home.jsx) ---
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-stone-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center">
          <h2 className="text-3xl font-bold">Loading Products...</h2>
        </div>
      </div>
    );
  }

  // --- Render Error State (Original Home.jsx) ---
  if (error) {
    return (
      <div className="min-h-screen bg-stone-100">
        <Navbar />
        <div className="container mx-auto px-4 py-8 text-center bg-red-200 border-4 border-red-700 shadow-[8px_8px_0_0_#f00]">
          <h2 className="text-3xl font-bold text-red-900">Error Fetching Data</h2>
          <p className="text-lg mt-2">{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">

        {/* Search, Filter, and Sort*/}
        <header className="mb-8 p-6 bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
          <div className="flex flex-col md:flex-row gap-4">
            <input
              type="text"
              placeholder="Search products by name..."
              className="grow p-3 text-lg border-2 border-black focus:outline-none focus:ring-4 focus:ring-yellow-300"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            {/* Dynamic Category Filter */}
            <select
              className="p-3 text-lg border-2 border-black bg-white font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 md:w-1/4"
              value={categoryFilter}
              onChange={handleCategoryChange}
            >
              <option value="all">All Categories</option>
              {categories.map(category => (
                <option key={category.id} value={category.name}>
                  {category.name}
                </option>
              ))}
            </select>
            <button
              className="p-3 text-lg border-2 border-black font-bold focus:outline-none focus:ring-4 focus:ring-yellow-300 bg-white hover:bg-yellow-300 transition-colors shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] flex items-center justify-center"
              onClick={handleSortToggle}
            >
              Sort: {sortOrder === 'ASC' ? 'A-Z (Ascending)' : 'Z-A (Descending)'}
            </button>
          </div>
        </header>

        {/* Dynamic Product Grid */}
        <div className="relative">
          {loading && (
             <div className="absolute inset-0 bg-stone-100 bg-opacity-75 flex justify-center items-center z-10">
                <h3 className="text-2xl font-bold">Loading...</h3>
             </div>
          )}
          {products.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {products.map(product => (
                <Link
                  to={`/${product.id}`}
                  key={product.id}
                  className="block"
                >
                  <Card
                    name={product.name}
                    description={product.description}
                    stock={product.stock}
                    price={product.price}
                    categoryId={product.category.name}
                    authorId={product.author.username}
                    imgUrl={product.imgUrl}
                  />
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center p-10 bg-white border-2 border-black shadow-[4px_4px_0_0_#000]">
              <h2 className="text-2xl font-bold">No Products Found</h2>
              <p className="text-gray-600 mt-2">Try adjusting your search or filter.</p>
            </div>
          )}
        </div>

        {/* Pagination */}
        <footer className="mt-12 flex justify-center items-center gap-2">
          <button
            className="py-2 px-4 bg-white border-2 border-black font-bold shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_#000]"
            onClick={handlePrevious}
            disabled={currentPage <= 1}
          >
            &lt; Prev
          </button>

          {/* Dynamic page buttons */}
          {pages.map(page => (
            <button
              key={page}
              className={`py-2 px-4 border-2 border-black font-bold shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all ${
                page === currentPage
                  ? 'bg-yellow-300'
                  : 'bg-white'
              }`}
              onClick={() => handlePages(page)}
            >
              {page}
            </button>
          ))}

          <button
            className="py-2 px-4 bg-white border-2 border-black font-bold shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all disabled:opacity-50 disabled:hover:translate-x-0 disabled:hover:translate-y-0 disabled:hover:shadow-[3px_3px_0_0_#000]"
            onClick={handleNext}
            disabled={currentPage >= totalPage}
          >
            Next &gt;
          </button>
        </footer>
      </main>
    </div>
  );
};

export default Home;