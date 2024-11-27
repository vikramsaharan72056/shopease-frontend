import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
        <nav className="mr-4">
          <ul className="flex space-x-4">
            <li>
              
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/cart">Cart</Link>
            </li>
            <li>
              <Link to="/checkout">Checkout</Link>
            </li>
            
            <li>
              {
                token ? (
                  <a href="#" className="hover:underline" onClick={() => logout() }>
                    Logout
                  </a>
                ) : (
                  <Link to="/login">Login</Link>
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
