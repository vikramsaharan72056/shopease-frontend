import React from 'react';

import { useAuth } from '../context/AuthContext';

function Header() {

  const {logout} = useAuth();
  const token = localStorage.getItem('token');

  
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
              <a href="/cart" className="hover:underline">
                Cart
              </a>
            </li>
            <li>
              <a href="/checkout" className="hover:underline">
                Checkout
              </a>
            </li>
            <li>
              <a href="/" className="hover:underline">
                Products
              </a>
            </li>
            <li>
              {
                token ? (
                  <a href="/logout" className="hover:underline" onClick={() => logout() }>
                    Logout
                  </a>
                ) : (
                  <a href="/login" className="hover:underline">
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
