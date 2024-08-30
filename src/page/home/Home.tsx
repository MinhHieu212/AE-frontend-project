import React from "react";
import { Link } from "react-router-dom";
import BannerCarousel from "../../component/BannerCarousel";

const Home = () => {
  return (
    <div className="w-full h-fullbg-white">
      <BannerCarousel />
      <Link to={"/products"}>Link to Products</Link>
    </div>
  );
};

export default Home;
