import React, { useContext, useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import UserContext from '../utils/userContext';
import useOnlineStatus from '../utils/useOnlineStatus';
import { useSelector } from 'react-redux';
import Logo from '../assets/Foodieweb_logo.png';
import './Header.css'; // Import custom CSS for animations

const Header = () => {
  const { loggedInUser, setUserInformation } = useContext(UserContext);
  const onlineStatus = useOnlineStatus();
  const cartItems = useSelector((store) => store.cart.items);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const location = useLocation();

  const handleLoginLogout = () => {
    if (loggedInUser) {
      setUserInformation(null);
    } else {
      window.location.href = "/login";
    }
  };

  // Close navbar on route change
  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  return (
    <header className="header-container">
      <div className="header-inner">
        <Link to="/">
          <img className="logo" src={Logo} alt="Logo" />
        </Link>
        <button
          className="mobile-menu-button"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          ☰
        </button>
        <nav className={`nav-items ${isNavOpen ? 'open' : ''}`}>
          <ul className="nav-list">
            <li className="nav-item">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/search">Search</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/about">About Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/contact">Contact Us</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cart">
                🛒({cartItems.length} items)
              </Link>
            </li>
            <li className="nav-item">
              <button
                className="login-button"
                onClick={handleLoginLogout}
              >
                {loggedInUser ? "Logout" : "Login"}
              </button>
            </li>
            {loggedInUser && (
              <li className="nav-item">
                Welcome, {loggedInUser}
              </li>
            )}
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
