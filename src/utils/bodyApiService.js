export const fetchData = async (latitude = 28.4594965, longitude = 77.0266383) => {
  try {
    const url = `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D${encodeURIComponent(latitude)}%26lng%3D${encodeURIComponent(longitude)}%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING`;

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