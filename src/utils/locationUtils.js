const API_KEY = process.env.REACT_APP_OPENCAGE_API_KEY;

export const getUserLocation = async () => {
  if (navigator.geolocation) {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          resolve({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          });
        },
        (error) => reject(error)
      );
    });
  } else {
    throw new Error('Geolocation is not supported by this browser.');
  }
};

export const fetchLocationName = async (latitude, longitude) => {
  try {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`);
    const data = await response.json();

    if (data.results && data.results.length > 0) {
      const addressComponents = data.results[0].components;

      // Extract city, state, and country
      const city = addressComponents.city || addressComponents._normalized_city || 'Unknown City';
      const state = addressComponents.state || 'Unknown State';
      const country = addressComponents.country || 'Unknown Country';

      // Return a formatted string (City, State, Country)
      return `${city}, ${state}, ${country}`;
    } else {
      return 'Unknown Location'; // Handle case where no location data is found
    }
  } catch (error) {
    console.error('Error fetching location name:', error);
    return 'Unknown Location'; // Return default location name in case of an error
  }
};

 
export const fetchData = async (city) => {
  try {
    // Update URL or API endpoint based on city
    const url = `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Fcity%3D${encodeURIComponent(city)}%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING`;

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const json = await response.json();
    return json;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};
