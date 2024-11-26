import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://shopease-backend-j304.onrender.com/api/cart/all', {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(response.data[0]);
        setCartItems(response.data[0].products);
        calculateTotal(response.data.items);
      } catch (err) {
        console.error('Failed to fetch cart items', err);
      }
    };

    fetchCartItems();
  }, []);

  const calculateTotal = (items) => {
    const sum = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotal(sum);
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(
        `https://shopease-backend-j304.onrender.com/api/cart/${itemId}`,
        { quantity: newQuantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      const updatedItems = cartItems.map((item) =>
        item._id === itemId ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      console.error('Failed to update quantity', err);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`https://shopease-backend-j304.onrender.com/api/cart/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedItems = cartItems.filter((item) => item._id !== itemId);
      setCartItems(updatedItems);
      calculateTotal(updatedItems);
    } catch (err) {
      console.error('Failed to remove item', err);
    }
  };

  return (
    <div>
      <h2>Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <div>
          {cartItems.map((item) => (
            <div key={item._id} className="cart-item">
              <h3>{item.name}</h3>
              <p>${item.price}</p>
              <input
                type="number"
                value={item.quantity}
                min="1"
                onChange={(e) => updateQuantity(item._id, parseInt(e.target.value))}
              />
              <button onClick={() => removeItem(item._id)}>Remove</button>
            </div>
          ))}
          <h3>Total: ${total}</h3>
          <button onClick={() => window.location.href = '/checkout'}>Proceed to Checkout</button>
        </div>
      )}
    </div>
  );
}

export default Cart;
