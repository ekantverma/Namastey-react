import { useParams } from "react-router-dom";
import { useState } from "react";
import Shimmer from "./Shimmer";
import useRestaurantManu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {
    const { resId } = useParams();
    const resInfo = useRestaurantManu(resId);
    const [showIndex, setShowIndex] = useState(0); // Initialize to 0 to show the first category by default

    if (resInfo === null) return <Shimmer />;

    const info = resInfo?.cards[2]?.card?.card?.info;
    const categories = resInfo?.cards[4]?.groupedCard?.cardGroupMap?.REGULAR?.cards
        .filter((c) => c.card?.card?.["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

    return (
        <div className="">
            <div className="text-center font-bold mt-8 mb-0 text-2xl text-black text-left pr-[605px]">
                <h1 className="text-black">{info.name}</h1>
            </div>
            <div className="text-center p-4 bg-white border border-8 shadow-lg rounded-2xl w-3/5 mx-auto mb-10 mt-5">
                <div className="font-bold text-lg text-gray-600 text-left">
                    <h2 className="text-green-600">✪ <span className="text-black"> {info.avgRating}</span> <span className="text-black">({info.totalRatingsString}) •&nbsp;{info.costForTwoMessage}</span></h2>
                    <h5 className="text-sm underline text-orange-500">{info.cuisines.join(", ")}</h5>
                    <h6 className="text-sm mt-2 text-black"><span className="text-gray-400 text-2lg">•</span> &nbsp;Outlet &nbsp;&nbsp; {info.areaName} <span className="text-red-500">▼</span></h6>
                    <h6 className="text-sm mt-3 mb-6 text-black"><span className="text-gray-400 text-2lg">•</span> {info.sla.slaString.toLowerCase()}</h6>
                    <hr></hr>
                    <h3 className="text-sm mt-3">🚴🏻‍♀️&nbsp;{info.sla.lastMileTravelString} | ₹44 Delivery fee will apply</h3>
                </div>
            </div>
            <div>
                <h3 className="text-center mb-8">﹄ MENU ﹃</h3>
            </div>
            <div>
                {categories.map((category, index) => (
                    <RestaurantCategory
                        key={category?.card?.card?.id}
                        info={category?.card?.card}
                        showItems={index === showIndex}
                        setShowIndex={() => setShowIndex(index === showIndex ? null : index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default RestaurantMenu;
