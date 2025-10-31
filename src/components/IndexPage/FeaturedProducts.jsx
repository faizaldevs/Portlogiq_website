import { useState, useEffect, useRef } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

 const FeaturedProducts = () => {
  const scrollRef = useRef(null);

  const [feaProducts, setFeaProducts] = useState([]); 
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get(`/api/store/random/products?limit=8`)
      .then((res) => {
        setFeaProducts(res.data.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <p className="text-center mt-10">Loading Featured products...</p>;
  }

  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300; // px
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="container mx-auto py-10 px-4">
      {/* Heading */}
      <div className="text-center mb-12 pt-4">
        <h2 className="text-4xl font-bold text-gray-800">Featured Products</h2>
        <p className="text-gray-600 mt-2 text-lg">Explore what we offer</p>
      </div>

      {/* Slider wrapper */}
      <div className="relative">
        {/* Left Button */}
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 p-2 
                     bg-white shadow-md rounded-full hover:bg-gray-200"
        >
          &#8592;
        </button>

        {/* Scrollable Row */}
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto scroll-smooth px-8 
                     cursor-grab select-none scrollbar-hide"
        >
          {feaProducts.map((p) => (
            <div
              key={p.id}
              className="min-w-[250px] bg-white rounded-lg shadow-md p-4 text-center"
            >
              <img
                src={p.images.length > 0 ? p.images[0] : "/img/default.png"}
                alt={p.name}
                className="w-full h-40 object-cover rounded"
              />
              <h3 className="text-lg font-semibold mt-2">{p.name}</h3>
              <p className="text-gray-500">{p.price}</p>
            </div>
          ))}
        </div>

        {/* Right Button */}
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 p-2 
                     bg-white shadow-md rounded-full hover:bg-gray-200"
        >
          &#8594;
        </button>
      </div>
    </div>
  );
}

export default FeaturedProducts;
