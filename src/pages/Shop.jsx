import { useState, useEffect } from "react";
import api from "../services/api";
import FooterPage from "../components/FooterPage.jsx";
import HeaderPage from "../components/HeaderPage.jsx";
import ProductSkeleton from "../components/ProductSkeleton";
import { toast } from "react-toastify";
import { useCart } from "../context/CartContext";

const ShopCollectionPage = () => {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const { refreshCartCount } = useCart();

  useEffect(() => {
    setLoading(true);
    api
      .get(`/api/store/allproducts?page=${currentPage}`)
      .then((res) => {
        const data = res.data.data;
        setProduct(data.data);
        setTotalPages(data.last_page);
      })
      .catch((err) => {
        console.error("Error fetching products:", err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  const handleAddToCart = async (p) => {
    try {
      let price = 0;

      if (p.unit_type === "with_unit") {
        const defaultUnit =
          p.product_units?.find((u) => u.is_default_sale === 1) ||
          p.product_units?.find((u) => u.is_base === 1);

        price = defaultUnit?.base_price || p.price;
      } else {
        price = p.price;
      }

      const payload = {
        product_id: p.id,
        quantity: 1,
        price,
      };

      if (p.unit_type === "with_unit") {
        const defaultUnit =
          p.product_units?.find((u) => u.is_default_sale === 1) ||
          p.product_units?.find((u) => u.is_base === 1);
        payload.unit_id = defaultUnit?.unit_id;
      }

      await api.post("/api/store/cart/add", payload);
      toast.success(`🛒 ${p.name} added to cart!`);
      await refreshCartCount();

    } catch (err) {
      console.error("Cart add failed:", err);
      toast.error("Failed to add product to cart!");
    }
  };

  if (loading) {
    return <ProductSkeleton />;
  }

  if (!product || product.length === 0) {
    return <p className="text-center mt-10 text-red-500">No products found.</p>;
  }

  return (
    <div className="min-h-screen font-sans">
      <HeaderPage />

      <main className="pt-20">
        <section className="bg-gray-50 py-12 mt-11">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex flex-col sm:flex-row items-center justify-between mb-10">
              <div className="text-center sm:text-left mb-4 sm:mb-0">
                <h2 className="text-4xl font-bold text-gray-800">
                  Our Collection
                </h2>
                <p className="text-gray-600 mt-1">Browse our latest products</p>
              </div>

              <div>
                <select
                  id="sort"
                  name="sort"
                  className="block w-48 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                >
                  <option value="az">A–Z</option>
                  <option value="za">Z–A</option>
                  <option value="new">Newest → Oldest</option>
                  <option value="old">Oldest → Newest</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-6">
              {product.map((p) => (
                <div key={p.id}>
                  <div className="relative overflow-hidden rounded-lg shadow group cursor-pointer">
                    <img
                      src={
                        p.images.length > 0 ? p.images[0] : "/img/default.png"
                      }
                      alt={p.name}
                      className="w-48 h-48 mx-auto object-cover"
                    />

                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition duration-300"></div>

                    <button
                      onClick={() => handleAddToCart(p)}
                      className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-blue-600 text-white px-3 py-2 rounded opacity-0 group-hover:opacity-100 transition duration-300"
                    >
                      Add to Cart
                    </button>
                  </div>

                  <div className="mt-3 text-center">
                    <h3 className="text-lg font-medium text-gray-900">
                      {p.name}
                    </h3>
                    <p className="text-gray-600">${p.price}</p>
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

      <FooterPage />
    </div>
  );
};

export default ShopCollectionPage;
