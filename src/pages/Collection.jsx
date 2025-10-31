import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import FooterPage from "../components/FooterPage.jsx";
import HeaderPage from "../components/HeaderPage.jsx";
import ProductSkeleton from "../components/ProductSkeleton";

const CollectionPage = () => {

  const [catProduct,setCatProduct] = useState(null);
  const [loading,setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { id } = useParams();

  // Fetch product details
  useEffect(() => {
    setLoading(true);
    api.get(`/api/store/categorywiseproducts/${id}?page=${currentPage}`)
      .then((res) => {
        const data = res.data.data;
        setCatProduct(data.data);
        setTotalPages(data.last_page);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching categorywise product:", err);
        setLoading(false);
      });
  }, [id,currentPage]);

   if (loading) {
     return <ProductSkeleton />;
  }

  if (!catProduct) {
    return <p className="text-center mt-10 text-red-500">Product not found.</p>;
  }

  return (
    <div className="min-h-screen font-sans">
      {/* Header */}
      <HeaderPage />

      {/* main content */}
      <main className="pt-20">
        <section className="bg-gray-50 py-12 mt-11">
          <div className="max-w-7xl mx-auto px-6">
            {/* Heading + Filter */}
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-4xl font-bold text-gray-800">
                  Our Collection
                </h2>
                <p className="text-gray-600 mt-1">Browse our latest products</p>
              </div>

              {/* Filter Dropdown */}
              <div>
                <label htmlFor="sort" className="sr-only">
                  Sort by
                </label>
                <select
                  id="sort"
                  name="sort"
                  className="block w-48 rounded-md 
                                             border-gray-300 shadow-sm 
                                             focus:border-blue-500 
                                             focus:ring-blue-500 sm:text-sm"
                >
                  <option value="az">A–Z</option>
                  <option value="za">Z–A</option>
                  <option value="new">Newest → Oldest</option>
                  <option value="old">Oldest → Newest</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {catProduct.map((product) => (
                <div key={product.id}>
                  <div className="relative overflow-hidden rounded-lg shadow group">
                    {/* Product Image */}
                    <img
                      src={product.images.length > 0 ? product.images[0] : "/img/default.png"}
                      alt={product.name}
                      className="w-48 h-48 mx-auto object-cover"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/40 opacity-0 
                                    group-hover:opacity-100 transition 
                                    duration-300">
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      className="absolute bottom-4 
                                     left-1/2 -translate-x-1/2 
                                     bg-blue-600 text-white px-3 py-2 
                                     rounded opacity-0 
                                     group-hover:opacity-100 
                                     transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>
                  <div className="mt-3 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {product.name}
                    </h3>
                    <p className="text-gray-600">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
             <div className="flex justify-center mt-10 space-x-2">
              <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                « Prev
              </button>

              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 hover:bg-gray-300"
                  }`}
                >
                  {i + 1}
                </button>
              ))}

              <button
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                }
                className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300 disabled:opacity-50"
              >
                Next »
              </button>
            </div>
          </div>
        </section>
      </main>

      {/*footer section*/}
      <FooterPage />
    </div>
  );
};

export default CollectionPage;
