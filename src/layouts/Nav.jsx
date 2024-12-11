import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 transition duration-300 ease-in-out">
      <div className="container mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-pink-500">
          <img src="https://i.imgur.com/Ve0ASrH.png" alt="sdbh" className="h-12" />
        </h1>
        <div className="flex-grow">
          <ul className="flex ">
            <li>
              <Link to="/" className="text-pink-500 hover:text-pink-300 transition duration-300 text-lg font-medium">
                Home/
              </Link>
            </li>
            <li>
              <Link to="/kiddi" className="text-pink-500 hover:text-pink-300 transition duration-300 text-lg font-medium">
                Kiddi/
              </Link>
            </li>
            <li>
              <Link to="/kioo" className="text-pink-500 hover:text-pink-300 transition duration-300 text-lg font-medium">
                Kioo
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <Link to={'/login'} className=" text-black hover:text-pink-500  transition duration-300  px-4 py-2 ">
            Login
          </Link>
        </div>
      </div>
    </nav>
  );
}

export default Nav;
