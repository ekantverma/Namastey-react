import React, { useState, useEffect, useContext, useCallback } from 'react';
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
import { Link } from "react-router-dom";
import useOnlineStatus from "../utils/useOnlineStatus";
import UserContext from "../utils/userContext";
import Carousel from "./Carousel";
import CarouselMinds from "./CarouselMinds";
import { fetchData } from "../utils/bodyApiService"; 

const Body = () => {
  const [listOfRestaurant, setListOfRestaurant] = useState([]);
  const [filteredRestro, setFilteredRestro] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const onlineStatus = useOnlineStatus();
  const { loggedInUser, setUserInfo } = useContext(UserContext);

  useEffect(() => {
    async function getRestaurants() {
      try {
        const data = await fetchData(); // Fetch data using the utility function
        if (data) {
          const restaurants = data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
          setListOfRestaurant(restaurants);
          setFilteredRestro(restaurants);
        }
      } catch (err) {
        setError("Failed to fetch restaurants. Please try again later.");
      } finally {
        setLoading(false);
      }
    }
    getRestaurants();
  }, []);

  const handleSearch = useCallback(() => {
    const filteredRestaurants = listOfRestaurant.filter((restaurant) =>
      restaurant.info.name.toLowerCase().includes(searchText.toLowerCase())
    );
    setFilteredRestro(filteredRestaurants);
  }, [searchText, listOfRestaurant]);

  const handleEnterKeyPress = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); 
      handleSearch();
    }
  };

  const FilterTopRes = () => {
    const filtered = listOfRestaurant.filter((restaurant) => restaurant.info?.avgRating > 4);
    setFilteredRestro(filtered);
  };

  if (onlineStatus === false) {
    return <h1>Looks like you are offline, Please check your internet Connection</h1>;
  }

  return (
    <div className="body font-medium mt-3">

      {/* Whats in your minds carousel */}
      {/* <CarouselMinds cardsData={filteredRestro} /> */}
      <CarouselMinds />
      <br />
      <hr />
      <br />

      {/* Carousel component with restaurant data */}
      {/* <Carousel cardsData={filteredRestro} /> */}
      <Carousel />

      <br />
      <hr />
      <br />

      <div className="cards-container">
        <div className="restro-names ml-4 md:ml-32 font-bold text-lg md:text-2xl">
          <h2>Restaurants with online food delivery in Gurgaon</h2>
        </div>
        <div className="res-container flex flex-wrap justify-center p-3">
          {loading ? <Shimmer /> : filteredRestro.map((restaurant) => (
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
