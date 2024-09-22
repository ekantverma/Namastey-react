// import React, { useContext, useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import UserContext from "../utils/userContext";
// import useOnlineStatus from "../utils/useOnlineStatus";
// import { useSelector } from "react-redux";
// import Logo from "../assets/Foodieweb_logo.png";
// import "./Header.css"; // Import custom CSS for animations

// const Header = () => {
  // const { loggedInUser, setUserInformation } = useContext(UserContext);
//   const onlineStatus = useOnlineStatus();
//   const cartItems = useSelector((store) => store.cart.items);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [location, setLocation] = useState("Default Location");
//   const [userLocation, setUserLocation] = useState(null);
//   const currentLocation = useLocation();

//   useEffect(() => {
//     setIsNavOpen(false);
//   }, [currentLocation]);

//   const handleLoginLogout = () => {
//     if (loggedInUser) {
//       setUserInformation(null);
//     } else {
//       window.location.href = "/login";
//     }
//   };

//   const handleSetLocation = async () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         async (position) => {
//           const { latitude, longitude } = position.coords;
//           // Fetch new data with user's location here
//           setUserLocation({ latitude, longitude });

//           // You can update location with API here
//           const newLocation = await fetchLocationName(latitude, longitude);
//           setLocation(newLocation);
//         },
//         (error) => {
//           console.error("Error fetching location:", error);
//         }
//       );
//     } else {
//       console.error("Geolocation is not supported by this browser.");
//     }
//   };

//   const fetchLocationName = async (latitude, longitude) => {
//     // Placeholder function for fetching location name based on coordinates
//     // Replace with actual API call if needed
//     return "New Location"; // Replace with the location name fetched from API
//   };

//   return (
//     <header className="header-container">
//       <div className="header-inner">
//         <Link to="/">
//           <img className="logo" src={Logo} alt="Logo" />
//         </Link>
//         <button
//           className="mobile-menu-button"
//           onClick={() => setIsNavOpen(!isNavOpen)}
//         >
//           ☰
//         </button>
//         <nav className={`nav-items ${isNavOpen ? "open" : ""}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               <span className="location-button" onClick={handleSetLocation}>
//                 {location} 🌍
//               </span>
//             </li>
//             <li className="nav-item">
//               Online Status: {onlineStatus ? "🟢" : "🔴"}
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/search">
//                 Search
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">
//                 About Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">
//                 Contact Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">
//                 🛒({cartItems.length} items)
//               </Link>
//             </li>
            // <li className="nav-item">
            //   <button className="login-button" onClick={handleLoginLogout}>
            //     {loggedInUser ? "Logout" : "Login"}
            //   </button>
            // </li>
            // {loggedInUser && (
            //   <li className="nav-item">Welcome, {loggedInUser}</li>
            // )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;


// import React, { useContext, useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import UserContext from "../utils/userContext";
// import useOnlineStatus from "../utils/useOnlineStatus";
// import { useSelector } from "react-redux";
// import Logo from "../assets/Foodieweb_logo.png";
// import "./Header.css";
// import { getUserLocation, fetchLocationName } from "../utils/locationUtils"; // Import utility functions

// const Header = () => {
//   const { loggedInUser, setUserInformation } = useContext(UserContext);
//   const onlineStatus = useOnlineStatus();
//   const cartItems = useSelector((store) => store.cart.items);
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [locationName, setLocationName] = useState("Default Location"); // Default location name
//   const [restaurants, setRestaurants] = useState([]);
//   const location = useLocation();

//   const handleLoginLogout = () => {
//     if (loggedInUser) {
//       setUserInformation(null);
//     } else {
//       window.location.href = "/login";
//     }
//   };

//   // Fetch restaurants based on location
//   const updateLocation = async () => {
//     getUserLocation(async (latitude, longitude) => {
//       if (latitude && longitude) {
//         try {
//           const name = await fetchLocationName(latitude, longitude);
//           setLocationName(name);
//           const restaurantsData = await fetchRestaurants(name);
//           setRestaurants(restaurantsData?.data?.cards || []); // Adjust according to your data structure
//         } catch (error) {
//           console.error('Error updating location:', error);
//           setLocationName("Error fetching location");
//         }
//       } else {
//         setLocationName("Unable to get location");
//       }
//     });
//   };

//   // Close navbar on route change
//   useEffect(() => {
//     setIsNavOpen(false);
//   }, [location]);

//   return (
//     <header className="header-container">
//       <div className="header-inner">
//         <Link to="/">
//           <img className="logo" src={Logo} alt="Logo" />
//         </Link>
//         {/* Location button */}
//         <li className="nav-item">
//           <button className="nav-link text-orange-400" onClick={updateLocation}>
//             {locationName}^
//           </button>
//         </li>
//         <button
//           className="mobile-menu-button"
//           onClick={() => setIsNavOpen(!isNavOpen)}
//         >
//           ☰
//         </button>
//         <nav className={`nav-items ${isNavOpen ? "open" : ""}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               Online Status: {onlineStatus ? "🟢" : "🔴"}
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/search">
//                 Search
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">
//                 About Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">
//                 Contact Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">
//                 🛒({cartItems.length} items)
//               </Link>
//             </li>
//             <li className="nav-item">
//               <button className="login-button" onClick={handleLoginLogout}>
//                 {loggedInUser ? "Logout" : "Login"}
//               </button>
//             </li>
//             {loggedInUser && (
//               <li className="nav-item">Welcome, {loggedInUser}</li>
//             )}
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;

// import React, { useState, useEffect } from "react";
// import { Link, useLocation } from "react-router-dom";
// import { useSelector } from "react-redux";
// import Logo from "../assets/Foodieweb_logo.png";
// import "./Header.css";
// import { getUserLocation, fetchLocationName, fetchData } from "../utils/locationUtils";
// import useOnlineStatus from "../utils/useOnlineStatus"; // Re-import the hook

// const Header = () => {
//   const onlineStatus = useOnlineStatus(); // Keep online status hook
//   const [isNavOpen, setIsNavOpen] = useState(false);
//   const [locationName, setLocationName] = useState("Gurgaon"); // Default location name
//   const [restaurants, setRestaurants] = useState([]);
//   const location = useLocation();
//   const cartItems = useSelector((store) => store.cart.items);

//   const updateLocation = async () => {
//     try {
//       const { latitude, longitude } = await getUserLocation();
//       if (latitude && longitude) {
//         const city = await fetchLocationName(latitude, longitude);
//         setLocationName(city);
//         const restaurantsData = await fetchData(city);
//         setRestaurants(restaurantsData?.data?.cards || []); // Adjust according to your data structure
//       } else {
//         setLocationName("Unable to get location");
//       }
//     } catch (error) {
//       console.error('Error updating location:', error);
//       setLocationName("Error fetching location");
//     }
//   };

//   const handleLocationClick = () => {
//     updateLocation(); // Update location and fetch restaurants
//   };

//   useEffect(() => {
//     setIsNavOpen(false);
//   }, [location]);

//   return (
//     <header className="header-container">
//       <div className="header-inner">
//         <Link to="/">
//           <img className="logo" src={Logo} alt="Logo" />
//         </Link>
//         {/* Location button */}
//         <li className="nav-item">
//           <button className="nav-link text-orange-400" onClick={handleLocationClick}>
//             {locationName} ^
//           </button>
//         </li>
//         <button
//           className="mobile-menu-button"
//           onClick={() => setIsNavOpen(!isNavOpen)}
//         >
//           ☰
//         </button>
//         <nav className={`nav-items ${isNavOpen ? "open" : ""}`}>
//           <ul className="nav-list">
//             <li className="nav-item">
//               Online Status: {onlineStatus ? "🟢" : "🔴"} {/* Preserved UI */}
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/search">
//                 Search
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/about">
//                 About Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/contact">
//                 Contact Us
//               </Link>
//             </li>
//             <li className="nav-item">
//               <Link className="nav-link" to="/cart">
//                 🛒({cartItems.length} items)
//               </Link>
//             </li>
//             <li className="nav-item">
//               <button className="login-button" onClick={() => window.location.href = "/login"}>
//                 Login
//               </button>
//             </li>
//           </ul>
//         </nav>
//       </div>
//     </header>
//   );
// };

// export default Header;



import React, { useContext, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import UserContext from "../utils/userContext";
import { useSelector } from "react-redux";
import Logo from "../assets/Foodieweb_logo.png";
import "./Header.css";
import { getUserLocation, fetchLocationName, fetchData } from "../utils/locationUtils";
import useOnlineStatus from "../utils/useOnlineStatus";

const Header = () => {
  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserInformation } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [locationName, setLocationName] = useState("Gurgaon, Haryana, India"); // Default location name
  const [locationCoords, setLocationCoords] = useState({ latitude: null, longitude: null });
  const [restaurants, setRestaurants] = useState([]);
  const location = useLocation();
  const cartItems = useSelector((store) => store.cart.items);

  const updateLocation = async () => {
    try {
      const { latitude, longitude } = await getUserLocation();
      setLocationCoords({ latitude, longitude });

      const location = await fetchLocationName(latitude, longitude);
      setLocationName(location);  // Set the formatted city, state, country

      // Update restaurants based on the new location
      const restaurantsData = await fetchData(latitude, longitude);
      dispatch(setRestaurants(restaurantsData?.data?.cards || []));
    } catch (error) {
      console.error('Error fetching or updating location:', error);
      // setLocationName('Error fetching location');
    }
  };

  const handleLocationClick = async () => {
    await updateLocation(); // Update location and fetch restaurants
  };

  useEffect(() => {
    setIsNavOpen(false);
  }, [location]);

  const handleLoginLogout = () => {
        if (loggedInUser) {
          setUserInformation(null);
        } else {
          window.location.href = "/login";
        }
      };

  return (
    <header className="header-container bg-white shadow-md px-4">
      <div className="header-inner flex items-center justify-between">
        {/* Logo and Location */}
        <div className="flex items-center space-x-6">
          <Link to="/">
            <img className="logo h-12" src={Logo} alt="Logo" />
          </Link>
          <li className="nav-item list-none">
            <button
              className="location-button text-gray-700 font-semibold hover:underline"
              onClick={handleLocationClick}
            >
              {locationName}
            </button>
          </li>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="mobile-menu-button text-3xl lg:hidden"
          onClick={() => setIsNavOpen(!isNavOpen)}
        >
          ☰
        </button>

        {/* Navigation Menu */}
        <nav className={`nav-items ${isNavOpen ? "block" : "hidden"} lg:flex lg:items-center`}>
          <ul className="nav-list flex space-x-3 text-md font-semibold items-center">
            <li className="nav-item">
              Online Status: {onlineStatus ? "🟢" : "🔴"}
            </li>
            <li className="nav-item">
              <Link className="nav-link hover:underline" to="/search">
                Search
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link hover:underline" to="/about">
                About Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link hover:underline" to="/contact">
                Contact Us
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link hover:underline" to="/cart">
                🛒({cartItems.length} items)
              </Link>
            </li>
            <li className="nav-item">
              <button className="login-button" onClick={handleLoginLogout}>
                {loggedInUser ? "Logout" : "Login"}
              </button>
            </li>
            {loggedInUser && (
              <li className="nav-item">Welcome, {loggedInUser}</li>
            )}
            </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
