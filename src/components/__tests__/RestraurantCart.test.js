import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import RestaurantCard from '../RestaurantCard';

const MOCK_DATA = {
    info: {
      id: "594820",
      name: "Chinese Wok",
      cloudinaryImageId: "e0839ff574213e6f35b3899ebf1fc597",
      locality: "Sector 34",
      areaName: "Sector 15",
      costForTwo: "₹250 for two",
      cuisines: ["Chinese"],
      avgRating: 4.1,
      parentId: "61955",
      avgRatingString: "4.1",
      totalRatingsString: "500+",
      sla: {
        deliveryTime: 28,
        lastMileTravel: 2.3,
        serviceability: "SERVICEABLE",
        slaString: "25-30 mins",
        lastMileTravelString: "2.3 km",
        iconType: "ICON_TYPE_EMPTY"
      },
      availability: {
        nextCloseTime: "2024-08-25 02:00:00",
        opened: true
      },
      badges: {},
      isOpen: true,
      type: "F",
      badgesV2: {
        entityBadges: {
          imageBased: {},
          textBased: {},
          textExtendedBadges: {}
        }
      },
      aggregatedDiscountInfoV3: {
        header: "ITEMS",
        subHeader: "AT ₹199"
      },
      differentiatedUi: {
        displayType: "ADS_UI_DISPLAY_TYPE_ENUM_DEFAULT",
        differentiatedUiMediaDetails: {
          mediaType: "ADS_MEDIA_ENUM_IMAGE",
          lottie: {},
          video: {}
        }
      },
      reviewsSummary: {},
      displayType: "RESTAURANT_DISPLAY_TYPE_DEFAULT",
      restaurantOfferPresentationInfo: {},
      externalRatings: {
        aggregatedRating: {
          rating: "--"
        }
      },
      ratingsDisplayPreference: "RATINGS_DISPLAY_PREFERENCE_SHOW_SWIGGY"
    }
  };
  
  test('should render RestaurantCard with correct name and data', () => {
    render(<RestaurantCard resData={MOCK_DATA} />);
  
    // Check if the name is rendered
    const restaurantName = screen.getByText('Chinese Wok');
    expect(restaurantName).toBeInTheDocument();
  
    // Check if the average rating is rendered
    const avgRating = screen.getByText('4.1 Stars');
    expect(avgRating).toBeInTheDocument();
  
    // Check if the SLA (Service Level Agreement) string is rendered
    const slaString = screen.getByText('25-30 mins');
    expect(slaString).toBeInTheDocument();
  });