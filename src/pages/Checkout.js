import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('credit-card');
  const navigate = useNavigate();

  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchCartItems = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(
          `http://localhost:5000/api/cart/all/${userId}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        setCartItems(response.data[0].products); // Assuming products are in `response.data[0].products`
        calculateTotal(response.data[0].products); // Pass correct data structure
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

  const handleCheckout = async () => {
    try {
      const token = localStorage.getItem('token');
      const orderData = {
        userId,
        items: cartItems.map((item) => ({
          productId: item.productId._id,
          name: item.productId.name,
          price: item.productId.price,
          quantity: item.quantity,
        })),
        totalAmount: total,
        paymentMethod,
        isPaid: paymentMethod !== 'cash-on-delivery', // Automatically mark as paid unless COD
      };

      // Send order to the backend
      await axios.post(
        'http://localhost:5000/api/orders/create/${userId}',
        orderData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      alert('Order placed successfully!');
      navigate('/thankyou'); // Redirect to Thank You page
    } catch (err) {
      console.error('Checkout failed', err);
      alert('Failed to complete order');
    }
  };

  return (
    <div className="container mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-6">Checkout</h2>
      
      {/* Cart Items */}
      <div className="space-y-4 bg-gray-50 rounded shadow-sm">
        {cartItems.map((item) => (
          <div key={item.productId._id} className="flex items-center justify-between p-4 border rounded shadow-sm">
            <img src={item.productId.image} alt={item.productId.name} className="w-16 h-16 object-cover rounded" />
            <div className="flex-1 ml-4">
              <h3 className="font-semibold text-lg">{item.productId.name}</h3>
              <p className="text-sm text-gray-600">
                ${item.productId.price} x {item.quantity}
              </p>
            </div>
            <p className="font-bold text-xl">${(item.productId.price * item.quantity).toFixed(2)}</p>
          </div>
        ))}
      </div>

      {/* Total Price */}
      <div className="mt-6 p-4 bg-gray-100 rounded shadow-sm">
        <h3 className="text-xl font-semibold">Total: ${total.toFixed(2)}</h3>
      </div>

      {/* Payment Method Selection */}
      <div className="mt-6 p-4 bg-gray-50 rounded shadow-sm">
        <h4 className="text-lg font-medium mb-4">Select Payment Method</h4>
        <select
          value={paymentMethod}
          onChange={(e) => setPaymentMethod(e.target.value)}
          className="w-full p-3 border rounded-lg bg-white shadow-sm"
        >
          <option value="credit-card">Credit Card</option>
          <option value="paypal">PayPal</option>
          <option value="cash-on-delivery">Cash on Delivery</option>
        </select>
      </div>

      {/* Place Order Button */}
      <div className="mt-6 text-center">
        <button
          onClick={handleCheckout}
          className="w-full py-3 text-white bg-blue-600 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        >
          Place Order
        </button>
      </div>
    </div>
  );
}

export default Checkout;
