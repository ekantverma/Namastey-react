import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fetchCollectionData } from "../utils/fetchCollectionData"; // This will fetch data using the second API
import { CDN_URL } from "../utils/constants";
import Shimmer from './Shimmer'

const MindsRestaurants = () => {
  const { collectionId } = useParams(); // Get 'collectionId' from URL params
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // For navigation to another URL

  useEffect(() => {
    const loadRestaurants = async () => {
      setLoading(true); // Start loading when new collectionId is fetched

      try {
        // Fetch restaurant data using the `collectionId`
        const restaurantData = await fetchCollectionData(collectionId);

        console.log("Fetched Data:", restaurantData); // Log the fetched data for debugging

        if (restaurantData && restaurantData.statusCode === 0) {
          const fetchedRestaurants = restaurantData.data.cards.slice(2).map(card => {
            const restaurantInfo = card.card?.card; // Accessing the restaurant info directly
            return restaurantInfo ? restaurantInfo : null;
          }).filter(Boolean); // Filter out any null values

          if (fetchedRestaurants.length === 0) {
            console.error("No valid restaurant data found");
          }
          setRestaurants(fetchedRestaurants);
        } else {
          console.error("No valid restaurant data found");
          setRestaurants([]);
        }
      } catch (error) {
        console.error("Error occurred while fetching restaurant data:", error);
        setRestaurants([]);
      } finally {
        setLoading(false); // Ensure loading is set to false
      }
    };

    loadRestaurants();
  }, [collectionId]); // Dependency on collectionId so it re-fetches data when it changes

  if (loading) {
    return (
      <Shimmer/>
    )
  }

  if (!restaurants.length) {
    return <div className="text-center text-lg">No restaurants found for this collection</div>;
  }

  return (
    <div className="flex justify-center p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 w-full max-w-5xl">
        {restaurants.map((restaurant) => (
          <div key={restaurant.info.id} className="p-2 gap-6">
            <div className="bg-white rounded-lg overflow-hidden w-full h-full mx-auto transition-transform duration-300 ease-in-out transform hover:scale-95 cursor-pointer">
              <div className="relative">
                <img
                  className="w-full h-36 object-cover"
                  alt={restaurant.info.name}
                  src={`${CDN_URL}${restaurant.info.cloudinaryImageId}`} // Using cloudinaryImageId for the image
                />
                {restaurant.info.aggregatedDiscountInfoV3 && (
                  <div
                    className="absolute bottom-0 left-0 w-full text-white text-center text-xl font-extrabold py-1"
                    style={{
                      background:
                        "linear-gradient(to top, rgba(0, 0, 0, 0.9) 15%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)",
                    }}
                  >
                    {`${restaurant.info.aggregatedDiscountInfoV3.header} - ${restaurant.info.aggregatedDiscountInfoV3.subHeader}`}
                  </div>
                )}
              </div>
              <div className="p-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">
                  {restaurant.info.name}
                </h3>
                <div className="flex justify-between text-md font-bold text-gray-600 mb-1 items-center">
                  <span>
                    <span className="text-green-600 text-xl">✪ </span>
                    {restaurant.info.avgRating} Stars
                  </span>
                  <span>
                    {restaurant.info.sla ? restaurant.info.sla.slaString : "N/A"}
                  </span>
                </div>
                <p className="text-gray-500 text-sm">
                  {restaurant.info.cuisines && Array.isArray(restaurant.info.cuisines)
                    ? restaurant.info.cuisines.join(", ")
                    : "N/A"}
                </p>
                <p className="text-gray-500 text-sm">{restaurant.info.areaName}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MindsRestaurants;
