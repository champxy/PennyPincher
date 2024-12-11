import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import usePennyPincherStore from '../../store/PennyPincher';


const Nav = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const logout = usePennyPincherStore((state) => state.logout);
  const actionlogout = usePennyPincherStore((state) => state.actionlogout);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  // console.log(logout);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Link className="flex items-center" to="/user">
            <img src="https://i.imgur.com/Ve0ASrH.png" alt="me" className="w-10 h-10" />
            <span className="font-semibold text-gray-800"> </span>
          </Link>
        </div>

        {/* Links for desktop */}
        <div className="hidden md:flex space-x-8 justify-center flex-grow">
          <NavLink to="/user" end className={({ isActive }) => (isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900')}>
            Dashboard
          </NavLink>
          <NavLink to="/user/main" className={({ isActive }) => (isActive ? 'text-blue-600' : 'text-gray-600 hover:text-gray-900')}>
            PennyPincher
          </NavLink>


          {/* <NavLink to="" className={({ isActive }) => (isActive ? 'text-pink-600 bg-gray-50 px-1 rounded-md duration-500 hover:bg-gray-300' : 'text-gray-600 duration-500 hover:text-gray-900')}>
            WeatherFinder
          </NavLink>
          <NavLink to="/Map" className={({ isActive }) => (isActive ? 'text-green-600 bg-gray-50 px-1 rounded-md duration-500 hover:bg-gray-300' : 'text-gray-600 duration-500 hover:text-gray-900')}>
            WeatherMap
          </NavLink>
          <NavLink to="/forecast" className={({ isActive }) => (isActive ? 'text-orange-600 bg-gray-50 px-1 rounded-md duration-500 hover:bg-gray-300' : 'text-gray-600 duration-500 hover:text-gray-900')}>
            Forecast
          </NavLink> */}

        </div>

        {/* Button */}
        <div className="hidden md:block">
          {/* <Link
            to="https://github.com/champxy"
            target="_blank"
            className="items-center flex hover:bg-gray-100 px-4 py-2 rounded-lg translate transition duration-300"
          >
            Contact Me
          </Link> */}
        </div>

        {
          logout === false ? (

            <div className="hidden md:block">
              <Link
                to="/login"
                onClick={actionlogout}
                className="items-center flex hover:bg-gray-100 px-4 py-2 rounded-lg translate transition duration-300"
              >
                Logout
              </Link>
            </div>
          ) : null
        }

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button onClick={toggleMenu} className="text-gray-800 focus:outline-none">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Links */}
      {isMenuOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="flex flex-col items-start px-6 py-4 space-y-2">
            <Link to="/" onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link to="/Weather" onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              WeatherFinder
            </Link>
            <Link to="/Map" onClick={toggleMenu} className="text-gray-600 hover:text-gray-900">
              WeatherMap
            </Link>
            <Link
              to="https://github.com/champxy"
              target="_blank"
              onClick={toggleMenu}
              className=" hover:bg-gray-100  rounded-lg translate transition duration-300"
            >
              Contact Me
            </Link>
            {
              logout === false ? (
                <Link
                  to="/login"

                  onClick={actionlogout}
                  className=" hover:bg-gray-100  rounded-lg translate transition duration-300"
                >
                  Logout
                </Link>
              ) : null
            }
          </div>
        </div>
      )}
    </nav>
  );
};

export default Nav;
