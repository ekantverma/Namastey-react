

import { LOGO_URL } from "../utils/constants.js";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus.js";
import UserContext from "../utils/userContext.js";
import { useSelector } from "react-redux";

const Header = () => {
  const [btnName, setBtnName] = useState("Login");
  const onlineStatus = useOnlineStatus();
  const {loggedInUser} = useContext(UserContext);

  // Subscribing to the store using Selecter (redux)
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  


  return (
    <header className="flex justify-between items-center p-4 bg-white shadow-md w-full">
      <div className="logo-container">
        <Link to="/">
          <img className="h-8 w-auto" src={LOGO_URL} alt="Logo" />
        </Link>
      </div>

      <nav className="nav-items">
        <ul className="flex space-x-8 text-gray-700 items-center">
          <li className="flex items-center">
            Online Status: {onlineStatus ? "🟢" : "🔴"}
          </li>
          <li>
            <Link className="hover:text-orange-500 transition duration-300" to="/">
              Home
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500 transition duration-300" to="/about">
              About Us
            </Link>
          </li>
          <li>
            <Link className="hover:text-orange-500 transition duration-300" to="/contact">
              Contact Us
            </Link>
          </li>
          <li>
            <Link className="font-bold text-md" to="/cart">
              Cart({cartItems.length} items)
            </Link>
          </li>
            <button
              className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600 transition duration-300"
              onClick={() => setBtnName(btnName === "Login" ? "Logout" : "Login")}
            >
              {btnName}
            </button>
            <li className="font-bold">{loggedInUser}</li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
