import React from "react";
import BannerCarousel from "../../components/BannerCarousel";
import PopularProducts from "./components/PopularProducts";
import EditorWrapper from "../../components/EditorWrapper";

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1430px] py-[50px] mx-auto bg-white">
      <BannerCarousel />
      <PopularProducts />
      <EditorWrapper />
    </div>
  );
};

export default Dashboard;
