const ShimmerMenuItem = () => {
    return (
      <div className="bg-gray-300 shadow-md rounded-lg overflow-hidden w-full h-64 mx-3 my-2 animate-pulse">
        <div className="w-full h-44 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-6 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    );
  };
  
  export default ShimmerMenuItem;
  
