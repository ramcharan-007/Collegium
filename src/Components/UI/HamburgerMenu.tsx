import { useState } from 'react';
import { Link } from 'react-router-dom';

const HamburgerMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Hamburger Button */}
      <button
        onClick={toggleMenu}
        className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
        aria-label="Menu"
      >
        <div className="flex flex-col gap-1">
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
          <div className="w-5 h-0.5 bg-white"></div>
        </div>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 z-40" 
            onClick={closeMenu}
          ></div>
          
          {/* Menu Content */}
          <div className="absolute right-0 top-full mt-2 w-80 bg-white rounded-lg shadow-xl z-50 overflow-hidden">
            {/* Header */}
            <div className="bg-gray-50 px-4 py-3 border-b">
              <h3 className="font-semibold text-gray-800">Hello, Welcome To Collegedunia</h3>
              <p className="text-sm text-gray-600">Search Colleges, Exams, Courses & More</p>
            </div>

            {/* Menu Items */}
            <div className="p-4 space-y-3">
              {/* Select Goal */}
              <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <span className="text-sm text-gray-700">Select Goal</span>
                <button className="text-orange-600 text-sm">✏️</button>
              </div>

              {/* Login/Register Button */}
              <Link
                to="/auth"
                onClick={closeMenu}
                className="block w-full bg-orange-600 hover:bg-orange-700 text-white text-center py-3 rounded-lg font-medium transition-colors"
              >
                Login/Register
              </Link>

              {/* Write Review Section */}
              <div className="bg-orange-50 p-4 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="text-2xl">💻</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">"Write a Review</h4>
                    <p className="text-orange-600 text-sm font-medium">& Earn Upto ₹300"</p>
                  </div>
                </div>
                <div className="flex text-orange-400 text-sm mt-2">
                  ★★★★☆
                </div>
              </div>

              {/* App Download */}
              <div className="text-center">
                <h4 className="font-semibold text-gray-800 mb-2">Get Collegedunia App</h4>
                <p className="text-sm text-gray-600 mb-3">For 10x Faster Results</p>
                <div className="flex gap-2 justify-center">
                  <img src="/api/placeholder/100/30" alt="Google Play" className="h-8" />
                  <img src="/api/placeholder/100/30" alt="App Store" className="h-8" />
                </div>
                <div className="mt-3 flex justify-center">
                  <div className="w-16 h-16 bg-gray-200 rounded border-2 border-dashed border-gray-400 flex items-center justify-center">
                    <span className="text-xs text-gray-500">QR</span>
                  </div>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-4 pt-4 border-t">
                <a href="#" className="text-gray-400 hover:text-gray-600">📘</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📷</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">🐦</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📺</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">💼</a>
                <a href="#" className="text-gray-400 hover:text-gray-600">📡</a>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default HamburgerMenu;