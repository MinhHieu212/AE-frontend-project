import React from "react";
import { Link } from "react-router-dom";
import BannerCarousel from "../../component/BannerCarousel";

const Home = () => {
  return (
    <div className="w-full h-full bg-white">
      <BannerCarousel />
    </div>
  );
};

export default Home;
