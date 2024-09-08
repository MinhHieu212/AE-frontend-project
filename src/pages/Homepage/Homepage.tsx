import React from "react";
import BannerCarousel from "./components/BannerCarousel";
import NewArrivalsProducts from "./components/NewArrivalsProducts";
import Categories from "./components/Categories";
import PopularProducts from "./components/PopularProducts";
import ProductShowcase from "./components/ProductShowcase ";
import FooterHomePage from "../../layout/BuyerLayout/components/BuyerFooter";

const Homepage = () => {
  return (
    <div className="w-full max-w-[1430px] p-3  mx-auto bg-white">
      <BannerCarousel />
      <Categories />
      <PopularProducts />
      <NewArrivalsProducts />
      <ProductShowcase />
    </div>
  );
};

export default Homepage;
