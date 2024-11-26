import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const userId = localStorage.getItem('userId');
  console.log(userId,"userId");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`https://shopease-backend-j304.onrender.com/api/cart/all/${userId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });

  const items = response.data[0]?.products || [];
  setCartItems(items);
  calculateTotal(items);
} catch (err) {
  console.error('Failed to fetch cart items', err);
}
    };

fetchCartItems();
  }, []);

const calculateTotal = (items) => {
  const sum = items.reduce(
    (acc, item) => acc + item.productId.price * item.quantity,
    0
  );
  setTotal(sum);
};

const updateQuantity = async (itemId, newQuantity) => {
  if (newQuantity < 1) return; // Prevents quantity from going below 1
  try {
    const token = localStorage.getItem('token');
    await axios.put(
      `https://shopease-backend-j304.onrender.com/api/cart/${itemId}`,
      { quantity: newQuantity ,userId:userId},
      { headers: { Authorization: `Bearer ${token}` } }
    );

    const updatedItems = cartItems.map((item) =>
      item.productId._id === itemId
        ? { ...item, quantity: newQuantity }
        : item
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  } catch (err) {
    console.error('Failed to update quantity', err);
  }
};

const removeItem = async (itemId) => {
  console.log(itemId,"itemId");
  try {
    const token = localStorage.getItem('token');
    await axios.delete(`https://shopease-backend-j304.onrender.com/api/cart/${itemId}?userId=${userId}`, {
      headers: { Authorization: `Bearer ${token}` },
      
    });

    const updatedItems = cartItems.filter(
      (item) => item.productId._id !== itemId
    );
    setCartItems(updatedItems);
    calculateTotal(updatedItems);
  } catch (err) {
    console.error('Failed to remove item', err);
  }
};

return (
  <div className="max-w-4xl mx-auto p-4">
    <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
    {cartItems.length === 0 ? (
      <p className="text-gray-600">Your cart is empty.</p>
    ) : (
      <div>
        {cartItems.map((item) => (
          <div
            key={item.productId._id}
            className="flex items-center justify-between bg-white shadow-md rounded-lg p-4 mb-4"
          >
            <img
              src={item.productId.image}
              alt={item.productId.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div className="flex-grow px-4">
              <h3 className="text-lg font-semibold">{item.productId.name}</h3>
              <p className="text-gray-600">${item.productId.price}</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded"
                onClick={() =>
                  updateQuantity(item.productId._id, item.quantity - 1)
                }
              >
                -
              </button>
              <span className="text-lg font-semibold">{item.quantity}</span>
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-1 px-3 rounded"
                onClick={() =>
                  updateQuantity(item.productId._id, item.quantity + 1)
                }
              >
                +
              </button>
            </div>
            <button
              className="text-red-600 hover:underline"
              onClick={() => removeItem(item.productId._id)}
            >
              <img src='/delete.png' alt='delete' className=' ml-4w-6 h-6' />
            </button>
          </div>
        ))}
        <div className="text-right mt-6">
          <h3 className="text-xl font-bold">Total: ${total.toFixed(2)}</h3>
          <button
            className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </button>
        </div>
      </div>
    )}
  </div>
);
}

export default Cart;
