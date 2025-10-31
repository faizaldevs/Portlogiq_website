import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const fetchCount = async () => {
      try {
        const res = await api.get("/api/store/cart/count");
        setCartCount(res.data.count);
      } catch (err) {
        console.error("Cart count error:", err);
      }
    };
    fetchCount();
  }, []);

  const refreshCartCount = async () => {
    try {
      const res = await api.get("/api/store/cart/count");
      setCartCount(res.data.count);
    } catch (err) {
      console.error("Refresh cart count error:", err);
    }
  };

  return (
    <CartContext.Provider value={{ cartCount, setCartCount, refreshCartCount }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
