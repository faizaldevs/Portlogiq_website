const ProductSkeleton = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12 mt-11 grid grid-cols-1 lg:grid-cols-2 gap-12 animate-pulse">
      {/* Left Image Skeleton */}
      <div className="w-full h-[500px] bg-gray-300 rounded-lg shimmer"></div>

      {/* Right Details Skeleton */}
      <div className="space-y-4">
        <div className="h-8 w-2/3 bg-gray-300 rounded shimmer"></div>
        <div className="h-6 w-1/3 bg-gray-300 rounded shimmer"></div>
        <div className="h-20 w-full bg-gray-300 rounded shimmer"></div>
        <div className="h-10 w-1/4 bg-gray-300 rounded shimmer"></div>
        <div className="h-12 w-32 bg-gray-300 rounded shimmer"></div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
