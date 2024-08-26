import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";
import { MENU_API } from "../utils/constants";
import useRestaurantManu from "../utils/useRestaurantMenu";
import RestaurantCategory from "./RestaurantCategory";

const RestaurantMenu = () => {

    const { resId } = useParams();

    const resInfo = useRestaurantManu(resId);

    const [showIndex, setShowIndex] = useState(0);

    if(resInfo === null) return (<Shimmer/>);

    const info = resInfo?.cards[2]?.card?.card?.info;
    
    const itemCards = resInfo?.cards[4]?.
    groupedCard?.cardGroupMap?.REGULAR?.cards[2]?.card?.card.itemCards;

    console.log(resInfo?.cards[4]?.
        groupedCard?.cardGroupMap?.REGULAR?.cards);

        const categories = resInfo?.cards[4]?.
        groupedCard?.cardGroupMap?.REGULAR?.cards.filter((c) => c.card?.card?.["@type"] == "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory");

        console.log(categories);

    return (
        <div className="">
        <div className="text-center font-bold mt-8 mb-0 text-2xl text-black text-left pr-[605px]">
        <h1 className="text-black">{info.name}</h1>
        </div>
        <div className="text-center p-4 bg-white border border-8 shadow-lg rounded-2xl w-3/5 mx-auto mb-10 mt-5">
        {/* <div className="font-bold my-4 text-2xl text-gray-800">
        <h1>{info.name}</h1>
        </div> */}
        <div className="font-bold text-lg text-gray-600">
        <h2 className="text-yellow-500">{info.avgRating} <span className="text-sm text-gray-500">({info.totalRatingsString} ratings)</span></h2>
        <h2 className="mt-2 text-gray-500">{info.costForTwoMessage}</h2>
        </div>
        </div>
        <div>
        {categories.map((category, index) => (
        <RestaurantCategory 
        key={category?.card?.card?.id} 
        info={category?.card.card} 
        showItems={index === showIndex}
        // setShowIndex={() => setShowIndex(index)}
        setShowIndex={setShowIndex}
        index={index}
    />
    ))}
    </div>
    </div>
    );
};

export default RestaurantMenu;