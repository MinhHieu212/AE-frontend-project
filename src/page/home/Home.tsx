import React from "react";
import { Link } from "react-router-dom";
import BannerCarousel from "../../component/BannerCarousel";

const Home = () => {
  return (
    <div className="w-full h-full bg-white">
      <BannerCarousel />
      <div className="flex items-center justify-center">
        <Link to={"/products"}>Link to Products</Link>
      </div>
    </div>
  );
};

export default Home;
