import { useEffect, useState } from "react";
import FooterPage from "../components/FooterPage.jsx";
import HeaderPage from "../components/HeaderPage.jsx";
import api from "../services/api.js";
import { useCart } from "../context/CartContext.jsx";
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';

const Cart = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const { refreshCartCount } = useCart();
  const navigate = useNavigate();

  const fetchCartItems = async () => {
    try {
      const res = await api.get("/api/store/cart/items");
      setItems(res.data.items);
    } catch (err) {
      console.error("Cart load error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCartItems();
  }, []);

  const increaseQty = async (id) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, qty: item.qty + 1 } : item
    );
    setItems(updated);
    await api.post("/api/store/cart/update", { id, type: "increase" });
    refreshCartCount();
  };

  const decreaseQty = async (id) => {
    const updated = items.map((item) =>
      item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
    );
    setItems(updated);
    await api.post("/api/store/cart/update", { id, type: "decrease" });
    refreshCartCount();
  };

  const removeItem = async (id) => {
    await api.post("/api/store/cart/remove", { id });
    setItems(items.filter((item) => item.id !== id));
    refreshCartCount();
  };

  const handleProceedCheckout = async () => {
    try {

      const hasItemsWithQty = items.some((item) => item.qty > 0);

      if (!hasItemsWithQty) {
        toast.warning("Please add items to your cart before checkout!");
        return; 
      }

      await api.get("/sanctum/csrf-cookie");

      const res = await api.get("/api/store/user/check-login");

      if (res.data.loggedIn) {
        navigate("/checkout");
      } else {
        navigate("/login");
      }
    } catch (err) {
      console.error("Login check failed:", err);
      navigate("/login");
    }
  };


  const subtotal = items.reduce((sum, i) => sum + i.price * i.qty, 0);
  // const shipping = items.length > 0 ? 10 : 0;
  // const total = subtotal + shipping;
  const total = subtotal;

  if (loading) return <div className="text-center mt-20">Loading cart...</div>;

  return (
    <>
      <HeaderPage />
      <section className="max-w-7xl mx-auto px-6 py-12 mt-11 grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>

          {items.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border-b pb-6"
                >
                  <div
                    className="flex items-center space-x-3 cursor-pointer hover:opacity-80 transition"
                    onClick={() => navigate(`/product/${item.product_id}`)}
                  >
                    <img
                      src={item.img || "/img/placeholder.png"}
                      alt={item.name}
                      className="w-24 h-auto rounded-lg"
                    />
                    <div>
                      <h2 className="text-lg font-semibold">
                        {item.name}
                      </h2>

                      {item.unit_id && item.unit_name !== "No Unit" && (
                        <p className="text-sm text-gray-500">
                          {item.unit_name}
                        </p>
                      )}

                      <p className="text-gray-600">
                        ${Number(item.price || 0).toFixed(2)}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <div className="flex items-center w-32 border rounded-lg">
                      <button
                        onClick={() => decreaseQty(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-xl font-bold border-r bg-gray-100"
                      >
                        -
                      </button>
                      <input
                        type="text"
                        value={item.qty}
                        className="w-full text-center outline-none"
                        readOnly
                      />
                      <button
                        onClick={() => increaseQty(item.id)}
                        className="w-10 h-10 flex items-center justify-center text-xl font-bold border-l bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:underline"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-gray-50 p-6 rounded-lg shadow">
          <h2 className="text-2xl font-bold mb-6">Order Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            {/* <div className="flex justify-between">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div> */}
            <hr />
            <div className="flex justify-between font-bold text-lg">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </div>
          <button
            onClick={handleProceedCheckout}
            className="mt-6 w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Proceed to Checkout
          </button>
        </div>
      </section>
      <FooterPage />
    </>
  );
};

export default Cart;
