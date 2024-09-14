import React, { useState, useEffect } from 'react';
import PizzaIcon1 from "../assets/food.png"; // First image
import PizzaIcon2 from "../assets/ice-cream.png"; // Second image

const MindsShimmer = () => {
  const [currentImage, setCurrentImage] = useState(PizzaIcon1);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) =>
        prevImage === PizzaIcon1 ? PizzaIcon2 : PizzaIcon1
      );
    }, 1000); // Change image every 2 seconds

    return () => clearInterval(interval); // Clean up interval on component unmount
  }, []);

  return (
    <div className="flex flex-col justify-center items-center h-[70vh] bg-[#282c3f]">
      <div className="relative flex justify-center items-center w-24 h-24 mb-4">
        
        {/* Loading Spinner */}
        <div className="absolute w-full h-full border-4 border-gray-300 border-t-gray-500 rounded-full animate-spin"></div>

        {/* Image Logo */}
        <img
          src={currentImage} 
          alt="Food Icon"
          className="w-12 h-12 object-contain" // Adjusted image size
        />
      </div>

      {/* Text Below Spinner */}
      <div className="text-white text-xl font-bold">
        Looking for great food near you ...
      </div>
    </div>
  );
};

export default MindsShimmer;
