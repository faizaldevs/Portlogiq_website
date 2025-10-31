import { useState } from 'react'
import './App.css'
import Collection from './pages/Collection.jsx';
import Shop from './pages/Shop.jsx';
import CheckOut from './pages/CheckOut.jsx';
import Product from './pages/Product.jsx';
import IndexPage from './pages/Index.jsx';
import CartPage from './pages/cart.jsx';
import ThankYouPage from './pages/ThankYouPage.jsx';
import SignInPage from './components/auth/SignInForm.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  // const [count, setCount] = useState(0)

  return (
    <>
      <ToastContainer
        style={{ marginTop: "4.5rem", zIndex: 9999 }} 
      />
      <Router>
        <Routes>
          <Route path="/" element={<IndexPage />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/categoryproduct/:id" element={<Collection />} />
          <Route path="/checkout" element={<CheckOut />} />
          <Route path="/login" element={<SignInPage />} />
          <Route path="/thankyou/:order_number" element={<ThankYouPage />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
