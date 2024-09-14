export const fetchData = async () => {
    try {
      const response = await fetch('https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3Flat%3D28.4594965%26lng%3D77.0266383%26is-seo-homepage-enabled%3Dtrue%26page_type%3DDESKTOP_WEB_LISTING');
      
      // Check if response is okay
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const json = await response.json(); // Use `response` instead of `data`
      return json;
    } catch (error) {
      console.error('Error fetching data:', error);
      return null;
    }
  };
  