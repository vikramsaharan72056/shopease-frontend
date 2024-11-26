import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Products from './pages/Products';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import Header from './pages/Header';
import Footer from './pages/Footer';
import ThankYou from './pages/Thankyou';

function App() {
  return (


    <div className="flex flex-col min-h-screen bg-cover bg-center" style={{ backgroundImage: "./backgroud.jpg" }}>
      <Header />
      <main className="flex-grow container mx-auto py-8">
       
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path='/thankyou' element={<ThankYou/>} />
          
        </Routes>
      </main>
      <Footer />
    </div>
    
      
        
      
   
  );
}

export default App;
