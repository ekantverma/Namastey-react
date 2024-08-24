import React, { useState } from 'react';
import MenuItemList from "./MenuItemList";

const RestaurantCategory = ({ info, showItems, setShowIndex, index}) => {
    const handleClick = () => {
        setShowIndex(showItems ? null : index);
    }
    
    return (
        <div>
            <div className="w-6/12 mx-auto my-4 bg-gray-50 shadow-lg p-4">
                <div className="flex justify-between cursor-pointer" onClick={handleClick}>
                    {/* Accordion Header */}
                    <span className="font-bold text-lg">{info.title} ({info.itemCards.length})</span>
                    <span> ▼ </span>
                </div>
                <div>
                    {/* Accordion Body */}
                    {showItems && <MenuItemList items={info.itemCards} />}
                </div>
            </div>
        </div>
    )
}


export default RestaurantCategory;