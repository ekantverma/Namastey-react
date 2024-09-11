import React, { useState, useEffect } from "react";
import RestaurantCard from "./RestaurantCard";
import { motion } from "framer-motion"; // For animations

const Search = () => {
  const [searchText, setSearchText] = useState(""); // State for search text
  const [listOfRestaurant, setListOfRestaurant] = useState([]); // State for list of restaurants
  const [filteredRestro, setFilteredRestro] = useState([]); // State for filtered restaurants
  const [hasSearched, setHasSearched] = useState(false); // State to track if a search has been performed

  // Fetch data when component mounts
  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    try {
      const response = await fetch("https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.4594965%26lng%3D77.0266383%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING");
      const data = await response.json();
      console.log(data);
      setListOfRestaurant(data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = () => {
    const filteredRestaurants = listOfRestaurant.filter((restaurant) =>
      restaurant?.info?.name?.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestro(filteredRestaurants); // Update the filtered list
    setHasSearched(true); // Set flag to true after search
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleSearch(); // Trigger search on Enter key press
    }
  };

  // Determine what to display
  const displayRestaurants = hasSearched ? filteredRestro : [];

  return (
    <div className="search-page mx-4 my-6">
      <div className="search-bar flex flex-col md:flex-row items-center justify-center mb-6">
        <input
          type="text"
          placeholder="Search Restaurant"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)} // Update searchText on input change
          onKeyPress={handleEnterKeyPress} // Trigger search on Enter key press
          className="p-3 mb-4 md:mb-0 md:mr-4 bg-gray-200 border-2 border-gray-300 rounded-md w-full md:w-6/12 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <button
          onClick={handleSearch} // Trigger search on button click
          className="bg-green-500 text-white rounded-lg px-4 py-2 hover:bg-green-600 transition-colors duration-300 shadow-md transform hover:scale-105"
        >
          Search
        </button>
      </div>

      <motion.div
        className="res-container flex flex-wrap justify-center p-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {displayRestaurants.length > 0 ? (
          displayRestaurants.map((restaurant) => (
            <motion.div
              key={restaurant.info.id}
              className="m-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <RestaurantCard resData={restaurant} />
            </motion.div>
          ))
        ) : (
          <p className="text-gray-500 text-lg">No results found</p> // Show this when no results are found after search
        )}
      </motion.div>
    </div>
  );
};

export default Search;
