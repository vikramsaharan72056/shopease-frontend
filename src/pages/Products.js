import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filter, setFilter] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [bannerMessage, setBannerMessage] = useState('');
  const [showBanner, setShowBanner] = useState(false);
  const productsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://shopease-backend-j304.onrender.com/api/products');
        setProducts(response.data);
        setCategories([...new Set(response.data.map((product) => product.category))]);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      const response = await axios.post(
        'https://shopease-backend-j304.onrender.com/api/cart/add',
        {
          productId,
          quantity: 1,
          userId: localStorage.getItem('userId'),
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log(response.data,"response.data");
      if(response.data){
        setBannerMessage("Product added to cart successfully !");
        setShowBanner(true);
        navigate("/cart");
      }
     
    } catch (err) {
      console.error('Failed to add product to cart', err);
    }
  };

  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(filter.toLowerCase())
  );

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <div>
      {/* Banner */}
      {showBanner && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-4 py-2 rounded shadow-md">
          {bannerMessage}
        </div>
      )}
      <h2>Latest Products</h2>
      <div className="mb-4">
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="rounded px-2 py-1"
        >
          <option value="">All Categories</option>
          {categories.map((category, index) => (
            <option key={index} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {currentProducts.map((product) => (
          <div
            key={product._id}
            className="flex flex-row items-center justify-around bg-white rounded-lg shadow-lg p-1 gap-3"
          >
            <img
              src={product.image}
              alt="Product"
              className="w-40 h-40 object-cover rounded-t-lg"
            />
            <div>
              <h3 className="text-lg font-bold mt-2">{product.name}</h3>
              <p className="text-gray-600 mt-1">${product.price}</p>
              <button
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                onClick={() => addToCart(product._id)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
      {/* Pagination controls */}
      <div className="flex justify-center mt-6">
        <button
          disabled={currentPage === 1}
          onClick={() => setCurrentPage((prev) => prev - 1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === 1 ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => setCurrentPage(index + 1)}
            className={`px-3 py-1 mx-1 rounded ${
              currentPage === index + 1
                ? 'bg-blue-700 text-white'
                : 'bg-blue-500 hover:bg-blue-600 text-white'
            }`}
          >
            {index + 1}
          </button>
        ))}
        <button
          disabled={currentPage === totalPages}
          onClick={() => setCurrentPage((prev) => prev + 1)}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === totalPages ? 'bg-gray-300' : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Products;
