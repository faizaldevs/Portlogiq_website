  import { useState } from "react";
  import { Link } from "react-router-dom";
  import { useCart } from "../context/CartContext";
  
  const HeaderPage = () => {
    const { cartCount } = useCart();
    // State for mobile menu
    const [menuOpen, setMenuOpen] = useState(false);
      return (
        <header className="w-full bg-white shadow-md fixed top-0 left-0 z-50">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center justify-between h-16 relative">
              {/* Desktop Menu */}
              <nav className="hidden md:flex items-center gap-x-[40px] text-gray-700 font-medium">
                <Link to="/" className="hover:text-black">Home</Link>
                <Link to="/shop" className="hover:text-black">Shop</Link>
                <Link to="/about" className="hover:text-black">About</Link>
                <Link to="/contact" className="hover:text-black">Contact</Link>
              </nav>

              {/* Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <img
                  src="/img/portlogiq_logo.png"
                  alt="Logo"
                  className="h-[50px] w-auto"
                />
              </div>
              {/* Left Icons */}
              <div className="hidden md:flex items-center space-x-1 text-gray-700">
                <button aria-label="Search" className="p-2 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                    <line
                      x1="16.65"
                      y1="16.65"
                      x2="21"
                      y2="21"
                      strokeWidth="2"
                    ></line>
                  </svg>
                </button>

                <button aria-label="Account" className="p-2 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="8" r="4" strokeWidth="2"></circle>
                    <path
                      d="M6 20c0-4 4-6 6-6s6 2 6 6"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </button>

                <button aria-label="Wishlist" className="p-2 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 21s-6-4.5-9-9a5.5 5.5 0 019-6 5.5 5.5 0 019 6c-3 4.5-9 9-9 9z"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </button>

                <Link to="/cart" aria-label="Cart" className="relative p-2 hover:text-black">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="2"></path>
                    <circle cx="7" cy="21" r="1" strokeWidth="2"></circle>
                    <circle cx="17" cy="21" r="1" strokeWidth="2"></circle>
                  </svg>
                 {cartCount > 0 && (
                    <>
                     <span
                        style={{
                          position: "absolute",
                          top: "-8px",
                          right: "-8px",
                          background: "olive",
                          color: "white",
                          fontSize: "12px",
                          borderRadius: "50%",
                          width: "20px",
                          height: "20px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          // fontWeight: "bold",
                        }}
                      >
                        {cartCount}
                      </span>
                    </>
                  )}
                </Link>
              </div>

                {/* Mobile Button */}
              <div className="md:hidden absolute right-0">
                <button onClick={() => setMenuOpen(!menuOpen)} className="p-2">
                  ☰
                </button>
              </div>
            </div>
          </div>

        {/* Mobile Menu */}
          {menuOpen && (
            <div className="md:hidden bg-white shadow-lg px-6 py-4">
              <div className="flex justify-center space-x-2 mb-4 text-gray-700">
                
                {/* Search */}
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="11" cy="11" r="7" strokeWidth="2"></circle>
                    <line x1="16.65" y1="16.65" x2="21" y2="21" strokeWidth="2"></line>
                  </svg>
                </button>

                {/* Account */}
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <circle cx="12" cy="8" r="4" strokeWidth="2"></circle>
                    <path d="M6 20c0-4 4-6 6-6s6 2 6 6" strokeWidth="2"></path>
                  </svg>
                </button>

                {/* Wishlist */}
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      d="M12 21s-6-4.5-9-9a5.5 5.5 0 019-6 5.5 5.5 0 019 6c-3 4.5-9 9-9 9z"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </button>

                {/* Cart */}
                <button className="p-2">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4" strokeWidth="2"></path>
                    <circle cx="7" cy="21" r="1" strokeWidth="2"></circle>
                    <circle cx="17" cy="21" r="1" strokeWidth="2"></circle>
                  </svg>
                </button>
              </div>

              {/* Menu links */}
              <nav className="flex flex-col space-y-3 text-center text-gray-700 font-medium">
                <a href="#" className="hover:text-black">Home</a>
                <a href="#" className="hover:text-black">Shop</a>
                <a href="#" className="hover:text-black">About</a>
                <a href="#" className="hover:text-black">Contact</a>
              </nav>
            </div>
          )}

        </header>
      );
  }

  export default HeaderPage;