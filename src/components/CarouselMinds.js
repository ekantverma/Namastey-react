import React, { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { fetchData } from "../utils/bodyApiService";
import { CDN_URL } from "../utils/constants";
import MindsShimmer from "./MindsShimmer";

const CarouselMinds = () => {
  const [listofMinds, setListofMinds] = useState([]);
  const mainSliderRef = useRef(null);
  const [mindsTitle, setMindsTitle] = useState("");

  useEffect(() => {
    const loadMindsData = async () => {
      const json = await fetchData();
      if (json) {
        const imageGridCards = json.data.cards[0]?.card?.card?.imageGridCards?.info;

        if (imageGridCards && imageGridCards.length > 0) {
          const collectionIds = imageGridCards.map((card) => {
            const entityId = card.entityId;
            const urlParams = new URLSearchParams(entityId.split("?")[1]);
            return urlParams.get("collection_id");
          }).filter((id) => id !== null);

          const mindsDataWithIds = imageGridCards.map((card, index) => ({
            ...card,
            collectionId: collectionIds[index],
          }));

          setListofMinds(mindsDataWithIds);
        }

        const mindsHeader = json.data.cards[0]?.card?.card?.header?.title;
        setMindsTitle(mindsHeader || "What's on your mind?");
      }
    };

    loadMindsData();
  }, []);

  const mainSliderSettings = {
    dots: false,
    infinite: false,
    speed: 400,
    slidesToShow: 5.5,
    slidesToScroll: 3,
    arrows: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 600, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const handlePrevClick = () => {
    mainSliderRef.current && mainSliderRef.current.slickPrev();
  };

  const handleNextClick = () => {
    mainSliderRef.current && mainSliderRef.current.slickNext();
  };

  return listofMinds.length === 0 ? (
    <MindsShimmer />
  ) : (
    <div className="relative w-[80%] mx-auto mt-1 mb-2 cursor-pointer">
      <div className="flex items-center justify-between mb-4">
        <h2 className="font-bold text-lg md:text-2xl text-gray-800">
          {mindsTitle}
        </h2>
        <div className="flex space-x-4">
          <button
            className="bg-gray-200 text-gray-800 p-2 rounded-full shadow-lg"
            onClick={handlePrevClick}
          >
            ⬅
          </button>
          <button
            className="bg-gray-200 text-gray-800 p-2 rounded-full shadow-lg"
            onClick={handleNextClick}
          >
            ➡
          </button>
        </div>
      </div>

      <Slider {...mainSliderSettings} ref={mainSliderRef} className="pt-4">
        {listofMinds.map((card, index) => (
          <Link to={`/collections/${card.collectionId}`} key={card.collectionId}>
            <div className="p-2">
              <div className="w-[144px] bg-white rounded-lg overflow-hidden text-center cursor-pointer">
                <div className="w-full h-[180px] flex items-center justify-center">
                  <img
                    className="w-[144px] h-[180px] object-cover"
                    alt={card.name}
                    src={`${CDN_URL}${card.imageId}`}
                  />
                </div>
              </div>
            </div>
          </Link>
        ))}
      </Slider>
    </div>
  );
};

export default CarouselMinds;
