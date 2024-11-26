import React from 'react';
import NavigationLink from './NavigationLink';
import { Link, useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();

  const isLoggedIn = !!localStorage.getItem('accessToken');

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    navigate('/login');
  };

  return (
    <header className='bg-gray-900 text-white p-4 shadow-md'>
      <div className='max-w-7xl mx-auto flex justify-between items-center'>
        <Link to='/' className='text-2xl font-bold'>
          🍿 Catalogue Manager
        </Link>
        <nav className='space-x-4 flex items-center'>
          <NavigationLink to='/'>Product List</NavigationLink>
          <NavigationLink to='/products/create'>Create Product</NavigationLink>
          {isLoggedIn ? (
            <button onClick={handleLogout} className='bg-white font-bold  px-4 py-2 rounded text-gray-900 hover:bg-gray-100'>
              Logout
            </button>
          ) : (
            <>
              <NavigationLink to='/login'>Login</NavigationLink>
              <NavigationLink to='/register'>Register</NavigationLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header;
