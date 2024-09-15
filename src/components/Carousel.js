import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { CDN_URL } from '../utils/constants';
import { fetchData } from '../utils/bodyApiService'; // Import fetchData from bodyApiService
import Shimmer from './Shimmer';

const Carousel = () => {
  const [listofTopRestro, setlistofTopRestro] = useState([]);
  const mainSliderRef = useRef(null); // Ref for the main slider
  const [carouselTitle, setCarouselTitle] = useState("");

  // Fetch data when the component mounts
  useEffect(() => {
    const loadTopRestaurants = async () => {
      try {
        const data = await fetchData();
        if (data) {
          // Extract and set the list of top restaurants
          const restaurants =
            data.data.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants || [];
          setlistofTopRestro(restaurants);
  
          // Extract and set the carousel title
          const title = data.data.cards[1]?.card?.card?.header?.title; // Adjust based on JSON structure
          if (title) {
            setCarouselTitle(title);
          } else {
            setCarouselTitle("Top restaurant chains in Delhi"); // Fallback title
          }
        }
      } catch (err) {
        console.error("Failed to fetch data:", err);
        setError("Failed to fetch data. Please try again later.");
      }
    };
  
    loadTopRestaurants();
  }, []);
  

  const mainSliderSettings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2.5,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handlePrevClick = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickPrev();
    }
  };

  const handleNextClick = () => {
    if (mainSliderRef.current) {
      mainSliderRef.current.slickNext();
    }
  };

  return listofTopRestro.length === 0 ? <Shimmer /> : (
    <div className="relative w-[80%] mx-auto mt-8 mb-4">
      <div className="flex items-center justify-between">
        <h2 className="font-bold text-lg md:text-2xl">{carouselTitle}</h2>
        <div className="flex space-x-4">
          <button
            className="bg-gray-200 text-white p-2 rounded-3xl shadow-lg"
            onClick={handlePrevClick}
          >
            ⬅
          </button>
          <button
            className="bg-gray-200 text-white p-2 rounded-3xl shadow-lg"
            onClick={handleNextClick}
          >
            ➡
          </button>
        </div>
      </div>

      <Slider {...mainSliderSettings} ref={mainSliderRef} className="pt-4">
        {listofTopRestro.map((card, index) => (
          <div key={index} className="p-2 gap-6">
            <div
              className="bg-white rounded-lg overflow-hidden w-full h-full mx-auto transition-transform duration-300 ease-in-out transform hover:scale-95 cursor-pointer" 
            >
              <div className="relative">
                <img
                  className="w-full h-36 object-cover"
                  alt={card.info.name}
                  src={`${CDN_URL}${card.info.cloudinaryImageId}`}
                />
                {card.info.aggregatedDiscountInfoV3 && (
                  <div
                    className="absolute bottom-0 left-0 w-full text-white text-center text-xl font-extrabold py-1"
                    style={{
                      background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9) 15%, rgba(0, 0, 0, 0.6) 35%, rgba(0, 0, 0, 0.3) 60%, transparent 100%)',
                    }}
                  >
                    {`${card.info.aggregatedDiscountInfoV3.header} - ${card.info.aggregatedDiscountInfoV3.subHeader}`}
                  </div>
                )}
              </div>
              <div className="p-1">
                <h3 className="text-lg font-bold text-gray-800 mb-1 truncate">{card.info.name}</h3>
                <div className="flex justify-between text-md font-bold text-gray-600 mb-1 items-center">
                  <span><span className='text-green-800 text-xl'>✪ </span>{card.info.avgRating} Stars</span>
                  <span>{card.info.sla ? card.info.sla.slaString : "N/A"}</span>
                </div>
                <p className="text-gray-500 text-sm">
                  {card.info.cuisines && Array.isArray(card.info.cuisines) ? card.info.cuisines.join(", ") : "N/A"}
                </p>
                <p className="text-gray-500 text-sm">
                  {card.info.areaName}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
