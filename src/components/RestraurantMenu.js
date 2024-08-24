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
        <div className="text-center">
            <div className="font-bold my-6 text-2xl">
                <h1>{info.name}</h1>
            </div>
            <span className="font-bold text-lg">
                <h2>{info.avgRating + " "}({info.totalRatingsString + " ratings"})</h2> 
                <h2>{info.costForTwoMessage}</h2>
            </span>
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
    );
};

export default RestaurantMenu;