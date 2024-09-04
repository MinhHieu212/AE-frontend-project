import React from "react";
import BannerCarousel from "../../components/BannerCarousel";
import PopularProducts from "./components/PopularProducts";
import ConfirmDialogDemo from "../AddProduct/components/PopupConfirm";

const Dashboard = () => {
  return (
    <div className="w-full max-w-[1430px] p-[40px]  mx-auto bg-white">
      <BannerCarousel />
      <PopularProducts />
    </div>
  );
};

export default Dashboard;
