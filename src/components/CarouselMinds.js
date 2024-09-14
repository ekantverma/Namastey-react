import React, { useRef, useState, useEffect } from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { fetchData } from '../utils/bodyApiService'; // Import fetchData utility
import { CDN_URL } from '../utils/constants';
import MindsShimmer from './MindsShimmer';

const CarouselMinds = ({ cardsData }) => {
  const [listofMinds, setListofMinds] = useState([]);
  const mainSliderRef = useRef(null); // Ref for the main slider

  // Use Effect Hooks
  useEffect(() => {
    const loadMindsData = async () => {
      const json = await fetchData(); // Call the external fetchData utility
      if (json) {
        setListofMinds(json.data.cards[0]?.card?.card?.gridElements?.infoWithStyle?.info || []);
      }
    };
    loadMindsData(); // Call the async function
  }, []);

  const mainSliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5.5,
    slidesToScroll: 3,
    arrows: false, // Disable default arrows
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
        },
      },
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

  return listofMinds.length === 0 ? <MindsShimmer /> :(
    <div className="relative w-[80%] mx-auto mt-1 mb-2 cursor-pointer">
      {/* Title and Navigation Buttons Container */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg md:text-2xl text-gray-800">What's on your mind?</h2>
        {/* Navigation Buttons */}
        <div className="flex space-x-4">
          <button
            className="bg-gray-200 text-white p-2 rounded-3xl shadow-lg hover:bg-gray-700 transition duration-300"
            onClick={handlePrevClick}
          >
            ⬅
          </button>
          <button
            className="bg-gray-200 text-white p-2 rounded-3xl shadow-lg hover:bg-gray-700 transition duration-300"
            onClick={handleNextClick}
          >
            ➡
          </button>
        </div>
      </div>

      {/* Main Carousel */}
      <Slider {...mainSliderSettings} ref={mainSliderRef} className="pt-4">
        {listofMinds.map((card, index) => (
          <div key={index} className="p-2">
            <div className="w-[144px] bg-white rounded-lg overflow-hidden text-center cursor-pointer">
              <div className="w-full h-[180px] flex items-center justify-center">
                <img
                  className="w-[144px] h-[180] object-cover"
                  alt={card.name}
                  src={CDN_URL + card.imageId}
                />
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselMinds;
