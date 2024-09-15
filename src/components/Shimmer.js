const ShimmerCard = () => {
  return (
    <div>
      <div className="bg-gray-300 shadow-md rounded-lg overflow-hidden w-80 h-64 mx-3 my-2 animate-pulse">
        <div className="w-full h-40 bg-gray-200"></div>
        <div className="p-4">
          <div className="h-4 bg-gray-200 rounded mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    </div>
  );
};

const Shimmer = () => {
  return (
    <div className="flex flex-wrap justify-center">
      {Array(20)
        .fill("")
        .map((_, index) => (
          <ShimmerCard key={index} />
        ))}
    </div>
  );
};

export default Shimmer;
