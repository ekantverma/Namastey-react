import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  if (!resData || !resData.info) {
    return null; // Return null or placeholder content for loading state
  }

  const { cloudinaryImageId, name, avgRating, sla, cuisines, aggregatedDiscountInfoV3, areaName } = resData.info;

  return (
    <div data-testid="resCard" className="bg-white rounded-lg overflow-hidden w-80 mx-3 my-4 transition-transform duration-300 ease-in-out transform hover:scale-95 cursor-pointer">
      <div className="relative">
        <img
          className="w-full h-44 object-cover"
          alt="Restaurant Logo"
          src={`${CDN_URL}${cloudinaryImageId}`}
        />
        {aggregatedDiscountInfoV3 && (
          <div
            className="absolute bottom-0 left-0 w-full text-white text-center text-xl font-extrabold py-2"
            style={{
              background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 15%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)',
            }}
          >
            {`${aggregatedDiscountInfoV3.header} - ${aggregatedDiscountInfoV3.subHeader}`}
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="text-lg font-bold text-gray-800 truncate">{name}</h3>
        <div className="flex justify-between text-md font-bold text-gray-600 items-center">
          <span><span className='text-green-600 text-2xl'>✪ </span>{avgRating} Stars</span>
          <span>{sla ? sla.slaString : "N/A"}</span>
        </div>
        <p className="text-gray-500 text-sm">
          {cuisines && Array.isArray(cuisines) ? cuisines.join(", ") : "N/A"}
        </p>
        <p className="text-gray-500 text-sm">
          {areaName || "N/A"}
        </p>
      </div>
    </div>
  );
};

export default RestaurantCard;
