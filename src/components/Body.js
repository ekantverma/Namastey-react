import RestaurantCard from "./RestaurantCard";
import React, { useState, useEffect, useContext } from 'react';
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";

const Body = () => {
  // Local State Variable
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [searchText, setSearchText] = useState("");

  // console.log(listOfRestaurant);

  //Use Effect Hooks
  useEffect(() => {
    fetchData();
  }, []); 

  const fetchData = async () => {
    const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=28.4594965&lng=77.0266383&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING");
    const json = await data.json();

    console.log(json);
    setListOfRestaurant(json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
    setFilteredRestro(json.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || []);
  }

  const onlineStatus = useOnlineStatus();

  if(onlineStatus === false ){
    return (<h1>Looks like you are offline, Please check your internet Connection</h1>)
  }

  const FilterTopRes = () => {
    const filtered = listOfRestaurant.filter((restaurant) => restaurant.info?.avgRating > 4);
    setFilteredRestro(filtered);
    console.log(filtered);
  };

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Prevent default form submission behavior
      handleSearch();
    }
  };

  const handleSearch = () => {
    const filteredRestaurants = listOfRestaurant.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestro(filteredRestaurants);
  };

  const {loggedInUser, setUserInfo} = useContext(UserContext);

  return listOfRestaurant.length === 0 ? <Shimmer/> : (
    <div className="body">
      <div className="my-4 flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <input
            type="text"
            data-testid="searchInput"
            className="border border-gray-300 rounded-l-lg p-2 focus:outline-none focus:ring-2 focus:ring-green-500 bg-white shadow-md w-64"
            placeholder="Search by restaurant name"
            value={searchText}
            onKeyPress={handleEnterKeyPress}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-green-500 text-white rounded-r-lg px-4 py-2 hover:bg-green-600 transition-colors duration-200 shadow-md"
          >
            Search
          </button>
        </div>

        <button
          className="bg-red-500 text-white rounded-lg px-4 py-2 hover:bg-red-600 transition-colors duration-200 shadow-md"
          onClick={FilterTopRes}
        >
          Top Rated Restaurants
        </button>
      </div>

      <div className="cards-container">
        <div className="restro-names ml-4 md:ml-32 font-bold text-lg md:text-2xl">
          <h2>Restaurants with online food delivery in Delhi</h2>
        </div>
        <div className="res-container flex flex-wrap justify-center p-3">
          {filteredRestro.map((restaurant) => (
            <Link to={"/restaurants/" + restaurant.info.id} key={restaurant.info.id}>
              <RestaurantCard resData={restaurant} />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Body;
