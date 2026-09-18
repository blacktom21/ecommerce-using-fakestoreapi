import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { userContext } from '../context/UserContext';
import avatar from '/avatar.png';
import Switcher from './Switcher';

export default function Header() {
  const [showLinks, setShowLinks] = useState(false);

  const { isLoggedIn } = useContext(userContext);

  return (
    <div className="site-header p-4 flex flex-col lg:flex-row lg:justify-between transition-all duration-300 lg:min-h-[8vh]">

      <div className="flex justify-between items-center">
        <div className="brand-mark text-3xl font-bold">
          VirtuCart
        </div>

        {/* Toggle Button for Mobile View */}
        <button
          onClick={() => setShowLinks(!showLinks)}
          className="lg:hidden focus:outline-none text-sm font-bold text-gray-600 hover:text-red-500"
        >
          {showLinks ? 'Close' : 'Menu'}
        </button>
      </div>

      {/* Responsive Navigation Links */}
      <ul className={`lg:flex lg:flex-row items-center font-semibold text-lg ${showLinks ? 'block' : 'hidden'}`}>
        <li className="mb-2 lg:mb-0 lg:mr-6">
          <Link to='/' className="nav-link">Home</Link>
        </li>
        <li className="mb-2 lg:mb-0 lg:mr-6">
          <Link to='/cart' className="nav-link">Cart</Link>
        </li> 
        <li className="mb-2 lg:mb-0 lg:mr-6">
          <Link to='/wishlist' className="nav-link">Wishlist</Link>
        </li>

        {(isLoggedIn === 'false' || !isLoggedIn || isLoggedIn == null || isLoggedIn == 'null') ?

          <li>
            <Link to='/login' className="nav-link">Login</Link>
          </li>

          :
          <li>
            <Link to='/profile' className="text-blue-500 dark:text-blue-300 hover:text-blue-700">
              <img src={avatar} alt="profile" className='rounded-full md:w-1/3 lg:block hidden' />
              <span className='lg:hidden'>Profile</span>
            </Link>
          </li>
        }
        <li className='flex justifys items-center mx-5 my-3'> <Switcher /></li>
      </ul>

    </div>
  );
}
