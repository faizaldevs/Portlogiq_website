import { useState, useEffect } from "react";
import api from "../../services/api";
import { useNavigate } from "react-router-dom";

const ProductsSection = () => {

  const [products, setProducts] = useState([]); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
     api.get(`/api/store/random/products?limit=5`)
      .then((res) => {
        setProducts(res.data.data); 
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []); 

  if (loading) {
    return <p className="text-center mt-10">Loading products...</p>;
  }

  return (
    <>

      {/* --- Most Selling Products Section --- */}
      <section className="bg-gray-100 py-16">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800">Most Selling Products</h2>
          <p className="text-gray-600 mt-2 text-lg">Explore what we offer</p>
        </div>

        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              onClick={() => navigate(`/product/${p.id}`)}
              className="bg-white rounded-xl shadow-md overflow-hidden 
                         hover:shadow-xl text-center transition-shadow 
                         duration-300 w-72 sm:w-96 md:w-full mx-auto p-6 cursor-pointer"
            >
              <img
                src={p.images.length > 0 ? p.images[0] : "/img/default.png"}
                alt={p.name}
                className="w-48 h-48 mx-auto object-cover"
              />
              <h2 className="text-lg font-semibold text-gray-800 mt-2">{p.name}</h2>
              <p className="text-gray-600 mt-2">${p.price}</p>
              <button 
                  onClick={() => navigate(`/product/${p.id}`)}
                  className="mt-4 w-32 bg-indigo-600 text-white py-2 rounded-lg hover:bg-indigo-700 transition-colors">
                Buy Now
              </button>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

export default ProductsSection;
