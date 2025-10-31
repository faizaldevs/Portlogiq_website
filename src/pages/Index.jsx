
import SwipeImages from "../components/IndexPage/SwipeImg.jsx";
import ProductsSection from "../components/IndexPage/ProductsSection.jsx";
import FooterPage from "../components/FooterPage.jsx";
import HeaderPage from "../components/HeaderPage.jsx";
import CategoriesSection from "../components/IndexPage/CategoriesSection.jsx";
import FeaturedProducts from "../components/IndexPage/FeaturedProducts.jsx";

export default function Home() {
  return (
    <>
      <HeaderPage />
      <SwipeImages />
      <ProductsSection />
      <CategoriesSection />
      <FeaturedProducts />
      <FooterPage />
    </>
  );
}
