import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Products() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://shopease-backend-j304.onrender.com/api/products');
        setProducts(response.data);
      } catch (err) {
        console.error('Failed to fetch products', err);
      }
    };

    fetchProducts();
  }, []);

  // before adding to the cart and navigating to the cart page,it should check for the user's token in the local storage.If the user is not logged in, it should navigate to the login page. If the user is logged in, it should add the product to the cart and navigate to the cart page.

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login');
        return;
      }
      console.log(token,"token");
      await axios.post('https://shopease-backend-j304.onrender.com/api/cart/add', {
        productId,
        quantity: 1,
        userId: localStorage.getItem('userId'),
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate('/cart');
    } catch (err) {
      console.error('Failed to add product to cart', err);
    }
  };
  

  const filteredProducts = products.filter((product) =>
    product.category.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div >
      <h2> Latest Products</h2>
      <input
        type="text"
        placeholder="Filter by category"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-10">
        {filteredProducts.map((product) => (
          
          <div class=" flex flex-row items-center justify-around bg-white rounded-lg shadow-lg p-1">
            <img src={product.image} alt="Product" class="w-40 h-40 object-cover rounded-t-lg"/>
            <div>
            <h3 class="text-lg font-bold mt-2">{product.name}</h3>
            <p class="text-gray-600 mt-1">{product.price}$</p>
            <button class="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
              Add to Cart
            </button>

              </div>
            
          </div>
        
        
        ))}
      </div>
    </div>
  );
}

export default Products;
