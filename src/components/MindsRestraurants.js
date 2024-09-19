import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchCollectionData } from "../utils/fetchCollectionData";
import { CDN_URL } from "../utils/constants";

const MindsRestraurants = () => {
  const { collectionId } = useParams();
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    const loadRestaurants = async () => {

      const params = new URLSearchParams(entityId.split("?")[1]);
      const collectionId = params.get("collection_id");

      const json = await fetchCollectionData(collectionId);
      console.log("API Response:", json); // Log API response for debugging

      if (json && json.statusCode === 0) {
        const data = json.data.cards || [];
        console.log("Restaurants Data:", data); // Log the cards data
        // Extract the imageGridCards info from the cards array
        const imageGridCards = data
          .filter((cardObj) => cardObj.card?.card?.imageGridCards)
          .flatMap((cardObj) => cardObj.card.card.imageGridCards.info);
        setRestaurants(imageGridCards);
      } else {
        console.error("Error fetching data or no data found.");
      }
      setLoading(false);
    };

    loadRestaurants();
  }, [collectionId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!restaurants.length) {
    return <div>No restaurants found</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-6 p-4">
      {restaurants.map((card, index) => (
        <div key={index} className="p-2 gap-6">
          <div className="bg-white rounded-lg overflow-hidden w-full h-full mx-auto transition-transform duration-300 ease-in-out transform hover:scale-95 cursor-pointer">
            <div className="relative">
              <img
                className="w-full h-36 object-cover"
                alt={card.description}
                src={`${CDN_URL}${card.imageId}`}
              />
              {card.description && (
                <div
                  className="absolute bottom-0 left-0 w-full text-white text-center text-xl font-extrabold py-1"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(0, 0, 0, 0.9) 15%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)",
                  }}
                >
                  {card.description}
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MindsRestraurants;
