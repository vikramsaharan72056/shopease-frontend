import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';

function Login() {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('https://shopease-backend-j304.onrender.comapi/auth/login', { email, password });
      console.log(response.data);
      login(response.data.token, response.data.userId);
    } catch (err) {
      console.error('Login failed', err);
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen ">
      <div className="w-full max-w-md p-8  rounded shadow-lg bg-white">
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="text"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-2 border rounded focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300"
          >
            Login
          </button>
          <p className="text-center mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-blue-500 hover:underline">
              Register
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
