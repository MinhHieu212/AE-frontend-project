import React from "react";
import BannerCarousel from "../../components/BannerCarousel";
import PopularProducts from "./components/PopularProducts";

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1430px] pb-[50px] mx-auto bg-white">
      <BannerCarousel />
      <PopularProducts />
    </div>
  );
};

export default Dashboard;
