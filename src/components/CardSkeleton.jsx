const CardSkeleton = () => {
  return (
    <div className="bg-white rounded-xl shadow-md w-72 sm:w-96 md:w-full mx-auto p-6 animate-pulse">
      <div className="w-full h-48 bg-gray-300 rounded shimmer"></div>
      <div className="mt-4 space-y-3">
        <div className="h-4 bg-gray-300 rounded shimmer w-3/4"></div>
        <div className="h-4 bg-gray-300 rounded shimmer w-1/2"></div>
        <div className="h-8 bg-gray-300 rounded shimmer w-24 mx-auto mt-4"></div>
      </div>
    </div>
  );
};

export default CardSkeleton;
