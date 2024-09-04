import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import UserContext from '../utils/userContext';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector } from 'react-redux';
import Logo from '../assets/Foodieweb_logo.png';

const Header = () => {
  const { loggedInUser, setUserInformation } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();

  // Subscribing to the store using Selector (redux)
  const cartItems = useSelector((store) => store.cart.items);

  const handleLoginLogout = () => {
    if (loggedInUser) {
      // Logout
      setUserInformation(null);
    } else {
      // Navigate to the login page if not logged in
      window.location.href = "/login";
    }
  };

  return (
    <header className="flex flex-wrap justify-between items-center p-4 bg-white shadow-md w-full h-auto md:h-[65px]">
      <div className="w-full md:w-auto flex justify-between items-center">
        <Link to="/">
          <img className="h-11 w-auto" src={Logo} alt="Logo" />
        </Link>
        <button
          className="block md:hidden text-orange-500 focus:outline-none"
          onClick={() =>
            document.querySelector(".nav-items").classList.toggle("hidden")
          }
        >
          ☰
        </button>
      </div>

      <nav className="nav-items w-full md:w-auto hidden md:flex">
        <ul className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-8 text-gray-700 items-center w-full md:w-auto">
          <li className="flex items-center">
            Online Status: {onlineStatus ? "🟢" : "🔴"}
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition duration-300"
              to="/"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition duration-300"
              to="/about"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              className="hover:text-orange-500 transition duration-300"
              to="/contact"
            >
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="font-bold text-md" to="/cart">
              🛒({cartItems.length} items)
            </Link>
          </li>
          <li>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300"
              onClick={handleLoginLogout}
            >
              {loggedInUser ? "Logout" : "Login"}
            </button>
          </li>
          {loggedInUser && (
            <li className="font-bold">
              Welcome, {loggedInUser}
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default Header;
