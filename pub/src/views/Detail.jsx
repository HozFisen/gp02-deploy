// src/views/Detail.jsx

import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router';
import axios from 'axios'; // Import axios
import Navbar from '../components/Navbar';
// import { getProductById } from '../data'; // No longer needed

// API Base URL for a single product
const API_URL_BASE = 'https://api.p2.gc01aio.foxhub.space/apis/pub/products/products';

const Detail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null);     // Add error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        setError(null);
        // We use the ID from the URL to build the new API endpoint
        const response = await axios.get(`${API_URL_BASE}/${id}`);
        setProduct(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProduct();
  }, [id]); // Re-run this effect if the ID in the URL changes

  // --- Render Loading State ---
  if (loading) {
    return (
      <div className="min-h-screen bg-stone-100">
        <Navbar />
        <div className="container mx-auto p-8 text-center">
          <h2 className="text-3xl font-bold">Loading...</h2>
        </div>
      </div>
    );
  }

  // --- Render Error/Not Found State ---
  if (error || !product) {
    return (
      <div className="min-h-screen bg-stone-100">
        <Navbar />
        <div className="container mx-auto p-8 text-center bg-red-200 border-4 border-red-700 shadow-[8px_8px_0_0_#f00]">
          <h2 className="text-3xl font-bold text-red-900">
            {error ? 'Error Fetching Product' : 'Product Not Found'}
          </h2>
          <p className="text-lg mt-2">{error}</p>
          <Link 
            to="/" 
            className="mt-6 inline-block text-black font-bold uppercase border-2 border-black bg-yellow-300 py-2 px-6 shadow-[4px_4px_0_0_#000] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] transition-all"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // Helper function for formatting dates
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric', month: 'long', day: 'numeric',
    });
  };

  // --- Main Product Display ---
  // (This section is mostly the same, but check data keys)
  return (
    <div className="min-h-screen bg-stone-100">
      <Navbar />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link 
            to="/" 
            className="text-black font-bold uppercase border-2 border-black bg-white py-2 px-4 shadow-[3px_3px_0_0_#000] hover:shadow-none hover:translate-x-[3px] hover:translate-y-[3px] transition-all"
          >
            &lt; Back to All Products
          </Link>
        </div>

        <div className="bg-white border-4 border-black shadow-[8px_8px_0_0_#000]">
          <div className="grid grid-cols-1 md:grid-cols-2">
            
            <div className="p-6 md:border-r-4 md:border-black">
              <img
                src={product.imgUrl}
                alt={product.name}
                className="w-full h-auto object-cover border-4 border-black"
              />
            </div>

            <div className="p-6">
              <h1 className="text-4xl md:text-5xl font-bold uppercase tracking-wide">
                {product.name}
              </h1>
              
              {/* ... (rest of the display logic is the same) ... */}
              
              <div className="my-4 flex flex-wrap gap-4 items-center">
                <span className="text-3xl font-bold bg-yellow-300 inline-block py-1 px-3 border-2 border-black">
                  ${product.price} 
                </span>
                {product.stock > 0 ? (
                  <span className="font-bold uppercase text-green-700 bg-green-200 border-2 border-green-700 py-1 px-3">
                    In Stock ({product.stock} available)
                  </span>
                ) : (
                  <span className="font-bold uppercase text-red-700 bg-red-200 border-2 border-red-700 py-1 px-3">
                    Out of Stock
                  </span>
                )}
              </div>

              <p className="text-lg my-6">
                {product.description}
              </p>

              <button className="w-full ...">
                
              </button>

              {/* Meta Details - Check your API data structure! */}
              <div className="mt-8 pt-6 border-t-2 border-black text-sm text-gray-700">
                <div className="grid grid-cols-2 gap-2">
                  <span className="font-bold">Category:</span>     <span>{product.category?.name || 'N/A'}</span>
                  <span className="font-bold">Author:</span>       <span>{product.author?.username || 'N/A'}</span>
                  <span className="font-bold">Added On:</span>     <span>{formatDate(product.createdAt)}</span>
                  <span className="font-bold">Last Updated:</span> <span>{formatDate(product.updatedAt)}</span>
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Detail;