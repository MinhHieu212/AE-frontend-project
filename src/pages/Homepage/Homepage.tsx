import React from "react";
import BannerCarousel from "./components/BannerCarousel";
import PopularProducts from "./components/PopularProducts";
import Categories from "./components/Categories";
import NewArrivals from "./components/NewArrivals";

const Homepage = () => {
  return (
    <div className="w-full max-w-[1430px] p-[40px] mx-auto bg-white">
      <BannerCarousel />
      <Categories />
      <PopularProducts />
      <NewArrivals />
    </div>
  );
};

export default Homepage;
