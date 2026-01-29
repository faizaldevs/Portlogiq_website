import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import api from "../services/api";
import HeaderPage from "../components/HeaderPage.jsx";
import FooterPage from "../components/FooterPage.jsx";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

const ThankYouPage = () => {
  const { order_number } = useParams();
  const [order, setOrder] = useState(null);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        if (order_number) {
            console.log("Fetching order for order number:", order_number);
          window.scrollTo(0, 0);
          const res = await api.get(`/api/store/order/${order_number}`);
          setOrder(res.data);
        }
      } catch (error) {
        console.error("Failed to fetch order:", error);
      }
    };
    fetchOrder();
  }, [order_number]);

  

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-50 to-indigo-100">
      <HeaderPage />

      <section className="flex-grow flex items-center justify-center py-20 px-6 pt-28">
        <div className="bg-white/90 backdrop-blur-md shadow-2xl rounded-3xl p-10 md:p-16 max-w-3xl w-full text-center transition-all duration-300 hover:shadow-blue-200">
          <div className="flex justify-center mb-10">
            <CheckCircleIcon className="success-icon" />
          </div>

          <h1 className="text-4xl font-extrabold text-gray-800 mb-6">
            Thank You for Your Order! 🎉
          </h1>
          <p className="text-gray-600 text-lg mb-10">
            We’ve received your order and will start processing it shortly.
          </p>

            {order_number && (
             <div className="order-box">
                <p className="order-text">
                            Order Number:{" "}
                            <span className="text-blue-700 font-bold tracking-wide">
                            {order_number}
                            </span>
                </p>
             </div>
            )}

          {/* Buttons */}
          <div className="order-buttons">
            <Link to="/" className="order-btn">
                Continue Shopping 🛍️
            </Link>

            <Link  className="order-btn">
                View My Orders 📦
            </Link>
            </div>
        </div>
      </section>

      <FooterPage />
    </div>
  );
};

export default ThankYouPage;
