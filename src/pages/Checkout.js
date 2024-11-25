import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('https://shopease-backend-j304.onrender.com/api/cart', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCartItems(response.data.items);
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

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      await axios.post(
        'https://shopease-backend-j304.onrender.com/api/checkout',
        { items: cartItems },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert('Checkout successful!');
      window.location.href = '/';
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Failed to checkout');
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {cartItems.map((item) => (
        <div key={item._id}>
          <h3>{item.name}</h3>
          <p>${item.price} x {item.quantity}</p>
        </div>
      ))}
      <h3>Total: ${total}</h3>
      <button onClick={handleCheckout}>Place Order</button>
    </div>
  );
}

export default Checkout;
