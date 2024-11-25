import React from 'react';

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-4 mt-auto">
      <div className="container mx-auto text-center">
        <p>&copy; {new Date().getFullYear()} ShopEase. All Rights Reserved.</p>
      </div>
    </footer>
  );
}

export default Footer;
