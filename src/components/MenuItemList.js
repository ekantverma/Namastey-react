import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { CDN_URL } from '../utils/constants';
import { addItem, removeItem } from '../utils/cartSlice';
import ShimmerMenuItem from './ShimmerMenuItem';

const MenuItemList = ({ items = [], isCartPage, isLoading }) => {
    const dispatch = useDispatch();
    const cartItems = useSelector((store) => store.cart.items);

    const handleAddItem = useCallback((item) => {
        dispatch(addItem({ ...item, quantity: 1 })); // Ensure quantity is added
    }, [dispatch]);

    const handleRemoveItem = useCallback((item) => {
        dispatch(removeItem(item));
    }, [dispatch]);

    const getItemCount = (itemId) => {
        const item = cartItems.find(item => item.card.info.id === itemId);
        return item ? item.quantity : 0;
    };

    const isItemInCart = (itemId) => {
        return cartItems.some(item => item.card.info.id === itemId);
    };

    if (isLoading) {
        return (
            <div className="flex flex-wrap justify-center">
                {Array(8).fill("").map((_, index) => (
                    <ShimmerMenuItem key={index} />
                ))}
            </div>
        );
    }

    return (
        <div>
            {items.map(item => (
                <div
                    data-testid="foodItems"
                    key={item.card.info.id}
                    className="bg-white shadow-lg rounded-lg flex p-4 max-w-2xl mx-auto mb-6 transform transition duration-100 h-auto"
                >
                    <div className="w-9/12 pr-4">
                        <div className="font-bold text-lg mb-2">
                            <div>{item.card.info.name}</div>
                            <div className="text-green-700">₹ {item.card.info.price / 100 || item.card.info.defaultPrice / 100}</div>
                        </div>
                        <div className="text-gray-700 text-[16px] mb-4">{item.card.info.description}</div>
                    </div>
                    <div className="w-3/12 relative">
                        <img 
                            src={CDN_URL + item.card.info.imageId} 
                            className="rounded-xl w-full object-cover h-44" 
                            alt={item.card.info.name} 
                        />
                        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
                            {!isItemInCart(item.card.info.id) ? (
                                <button
                                    className="bg-green-500 text-white py-1 px-4 rounded-lg shadow-md hover:bg-white hover:text-green-500 transition duration-300"
                                    onClick={() => handleAddItem(item)}
                                >
                                    Add
                                </button>
                            ) : (
                                <div className="flex items-center space-x-2 bg-white rounded-md px-2 py-1">
                                    <button
                                        className="border-[1px] text-black font-bold text-md px-2 rounded-lg shadow-md hover:bg-red-600 transition duration-300"
                                        onClick={() => handleRemoveItem(item)}
                                    >
                                        -
                                    </button>
                                    <span className="text-gray-700 font-bold">{getItemCount(item.card.info.id)}</span>
                                    <button
                                        className="border-[1px] text-black font-bold text-md px-2 rounded-lg shadow-md hover:bg-green-600 transition duration-300"
                                        onClick={() => handleAddItem(item)}
                                    >
                                        +
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MenuItemList;
