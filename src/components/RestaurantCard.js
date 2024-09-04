import { CDN_URL } from "../utils/constants";

const RestaurantCard = ({ resData }) => {
  if (!resData || !resData.info) {
    return <div>Data not available</div>;
  }

  const { cloudinaryImageId, name, avgRating, sla, cuisines, aggregatedDiscountInfoV3 } = resData.info;

  return (
    <div data-testid="resCard" className="bg-white shadow-md rounded-lg overflow-hidden w-80 hover:shadow-lg transition-shadow duration-300 relative mx-3 my-2">
      <div className="relative">
        <img
          className="w-full h-40 object-cover"
          alt="res-logo"
          src={CDN_URL + cloudinaryImageId}
        />
        {aggregatedDiscountInfoV3 && (
          <div className="absolute bottom-0 left-0 w-full bg-black bg-opacity-50 text-white text-center text-sm py-1">
            {`${aggregatedDiscountInfoV3.header} - ${aggregatedDiscountInfoV3.subHeader}`}
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-2 truncate">{name}</h3>
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{avgRating} Stars</span>
          <span>{sla.slaString}</span>
        </div>
        <p className="text-gray-500 text-sm">{cuisines.join(", ")}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;
