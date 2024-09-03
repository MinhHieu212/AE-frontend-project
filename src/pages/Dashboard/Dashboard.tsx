import React from "react";
import BannerCarousel from "../../components/BannerCarousel";
import PopularProducts from "./components/PopularProducts";

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1430px] py-[40px] mx-auto bg-white">
      <BannerCarousel />
      <PopularProducts />
    </div>
  );
};

export default Dashboard;
