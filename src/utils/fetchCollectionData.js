export const fetchCollectionData = async (collectionId) => {
  if (!collectionId) {
    console.error("Collection ID is missing.");
    return null;
  }

  try {
    const response = await fetch(
      `https://cors-handlers.vercel.app/api/?url=https%3A%2F%2Fwww.swiggy.com%2Fdapi%2Frestaurants%2Flist%2Fv5%3FsortBy%3D%26filters%3D%26type%3Drcv2%26offset%3D0%26page_type%3Dnull%26collection%3D${collectionId}%26lat=28.7040592%26lng=77.1024901`
    );

    if (!response.ok) {
      throw new Error(`Network response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    // Log fetched data for debugging
    console.log("Fetched Data:", data);

    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
    return null;
  }
};
