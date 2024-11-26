import React from 'react';
import { useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

function Header() {

  const {logout} = useAuth();
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  
  return (
    <header className="bg-blue-600 text-white py-4">
      <div className="container mx-auto flex justify-between items-center">
        <a href='/'>
        <h1 className="text-xl font-bold" >ShopEase</h1> </a>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/" className="hover:underline">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline" onClick={() => navigate('/cart')}>
                Cart
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline" onClick={() => navigate('/checkout')}>
                Checkout
              </a>
            </li>
            
            <li>
              {
                token ? (
                  <a href="/logout" className="hover:underline" onClick={() => logout() }>
                    Logout
                  </a>
                ) : (
                  <a href="#" className="hover:underline" onClick={() => navigate('/login')}>
                    Login
                  </a>
                )
              }
              
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
