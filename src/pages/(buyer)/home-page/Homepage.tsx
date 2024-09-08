import React from "react";
import Categories from "./components/Categories";
import Banners from "./components/Banners";
import Populars from "./components/Populars";
import NewArrivals from "./components/NewArrivals";
import Showcase from "./components/Showcase";

const Homepage = () => {
  return (
    <div className="w-full max-w-[1430px] p-3  mx-auto bg-white">
      <Banners />
      <Categories />
      <Populars />
      <NewArrivals />
      <Showcase />
    </div>
  );
};

export default Homepage;
