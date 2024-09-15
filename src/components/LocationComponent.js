import React, { useState, useEffect } from "react";
import { fetchData } from "../utils/fetchData";

const LocationComponent = () => {
  const [location, setLocation] = useState(null);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    const getLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;
            setLocation({ latitude, longitude });

            // Fetch data with user's location
            const fetchedData = await fetchData(latitude, longitude);
            setData(fetchedData);
          },
          (error) => {
            handleLocationError(error);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    };

    getLocation();
  }, []);

  const handleLocationError = (error) => {
    switch (error.code) {
      case error.PERMISSION_DENIED:
        setError("User denied the request for Geolocation.");
        break;
      case error.POSITION_UNAVAILABLE:
        setError("Location information is unavailable.");
        break;
      case error.TIMEOUT:
        setError("The request to get user location timed out.");
        break;
      case error.UNKNOWN_ERROR:
        setError("An unknown error occurred.");
        break;
      default:
        setError("An unknown error occurred.");
    }
  };

  return (
    <div>
      {error && <p>Error: {error}</p>}
      {data && (
        <div>
          <h2>Data Based on Your Location</h2>
          {/* Render your data here */}
        </div>
      )}
      {!data && !error && <p>Fetching location and data...</p>}
    </div>
  );
};

export default LocationComponent;
