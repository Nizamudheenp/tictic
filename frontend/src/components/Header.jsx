import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCart2, BsXLg, BsList, BsPersonFill } from "react-icons/bs";

const Header = () => {
  const [showUserDropdown, setShowUserDropdown] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userInfo, setUserInfo] = useState(null);
  const navigate = useNavigate();
  const dropdownRef = useRef();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const user = JSON.parse(localStorage.getItem('user'));
    if (token && user) {
      setIsLoggedIn(true);
      setUserInfo(user);
    } else {
      setIsLoggedIn(false);
      setUserInfo(null);
    }
  }, []);

  useEffect(() => {
    const handler = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShowUserDropdown(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  const handleUserIconClick = () => {
    if (isLoggedIn) {
      setShowUserDropdown(prev => !prev);
    } else {
      navigate('/login');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setShowUserDropdown(false);
    navigate('/login');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/20 md:bg-white/20 md:backdrop-blur-md">
      <div className="max-w-[1200px] mx-auto px-6 md:px-8 py-1 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3">
          <img src="/images/logo og.jpg" alt="Logo" className="h-15 w-16 rounded-full object-cover" />
        </Link>

        <nav className="hidden md:flex items-center gap-6 py-4">
          <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 hover:text-primary-500">Home</Link>
          <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 hover:text-primary-600">Shop</Link>
          <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 hover:text-primary-600">About</Link>
          <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-bold text-gray-900 hover:text-primary-600">Contact</Link>
        </nav>

        <div className="flex items-center gap-4 py-3">
          <Link to="/cart" className="hidden sm:inline-flex items-center text-gray-900 hover:text-primary-600">
            <BsCart2 className="text-2xl" />
          </Link>

          <div className="relative" ref={dropdownRef}>
            <button
              onClick={handleUserIconClick}
              aria-haspopup="true"
              aria-expanded={showUserDropdown}
              className="inline-flex items-center justify-center p-1 rounded-full hover:bg-primary-500"
            >
              <BsPersonFill className="text-3xl text-gray-900" />
            </button>

{/* Dropdown */}

            <div className={`absolute right-0 mt-3 w-56 bg-white/95 backdrop-blur-sm border border-gray-200 rounded-lg shadow-lg p-3 transform transition-all ${showUserDropdown ? 'opacity-100 scale-100 visible' : 'opacity-0 scale-95 invisible'}`}>
              {!isLoggedIn ? (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-medium text-gray-700">Not signed in</p>
                  <Link to="/login" className="w-full text-center py-2 text-sm font-semibold rounded-md bg-primary-500 text-white">Sign in</Link>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <p className="text-sm font-semibold text-gray-800 truncate">Signed in as {userInfo?.name || 'User'}</p>
                  <Link to="/myorders" className="text-sm">
                    <button className="w-full py-2 text-sm font-medium rounded-md border border-transparent hover:bg-gray-50">My Orders</button>
                  </Link>

                  {userInfo?.isAdmin && (
                    <>
                      <Link to="/admin/dashboard"><button className="w-full py-2 text-sm font-medium rounded-md border border-transparent hover:bg-gray-50">Admin Dashboard</button></Link>
                      <Link to="/admin/orders"><button className="w-full py-2 text-sm font-medium rounded-md border border-transparent hover:bg-gray-50">Manage Orders</button></Link>
                    </>
                  )}

                  <button onClick={handleLogout} className="w-full py-2 text-sm font-semibold rounded-md bg-red-600 text-white hover:bg-red-700">Logout</button>
                </div>
              )}
            </div>
          </div>

          <button className="md:hidden inline-flex items-center justify-center p-2 rounded-md" onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu">
            <BsList className="text-2xl" />
          </button>
        </div>
      </div>

{/* Mobile */}
      <div className={`fixed inset-0 z-40 md:hidden transition-transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="absolute inset-0 bg-black/40" onClick={() => setIsMobileMenuOpen(false)} />
        <aside className="absolute right-0 top-0 bottom-0 w-72 bg-white p-6 shadow-xl">
          <div className="flex items-center justify-between">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="flex items-center gap-2">
              <img src="/images/logo og.jpg" alt="logo" className="h-10 w-10 rounded-full" />
            </Link>
            <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 rounded-md">
              <BsXLg className="text-2xl" />
            </button>
          </div>

          <nav className="mt-6 flex flex-col gap-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium">Home</Link>
            <Link to="/shop" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium">Shop</Link>
            <Link to="/about" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium">About</Link>
            <Link to="/contact" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium">Contact</Link>
            <Link to="/cart" onClick={() => setIsMobileMenuOpen(false)} className="py-2 text-gray-800 font-medium inline-flex items-center gap-2">
              <BsCart2 className="text-xl" /> Cart
            </Link>

            <div className="mt-4 border-t pt-4">
              {!isLoggedIn ? (
                <Link to="/login" onClick={() => setIsMobileMenuOpen(false)} className="block w-full text-center py-2 rounded-md bg-primary-500 text-white font-semibold">Sign in</Link>
              ) : (
                <>
                  <p className="text-sm font-medium py-2">Signed in as {userInfo?.name || 'User'}</p>
                  <Link to="/myorders" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">My Orders</Link>
                  {userInfo?.isAdmin && (
                    <>
                      <Link to="/admin/dashboard" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Admin Dashboard</Link>
                      <Link to="/admin/orders" onClick={() => setIsMobileMenuOpen(false)} className="block py-2">Manage Orders</Link>
                    </>)}
                  <button onClick={() => { handleLogout(); setIsMobileMenuOpen(false); }} className="mt-3 w-full py-2 rounded-md bg-red-600 text-white">Logout</button>
                </>
              )}
            </div>
          </nav>
        </aside>
      </div>
    </header>
  );
};

export default Header;
