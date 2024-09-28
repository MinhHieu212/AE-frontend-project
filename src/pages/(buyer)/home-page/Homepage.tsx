import React from "react";
import Categories from "./components/Categories";
import Banners from "./components/Banners";
import Populars from "./components/Populars";
import NewArrivals from "./components/NewArrivals";
import Showcase from "./components/Showcase";
import { useAppSelector } from "../../../store/store";

const Homepage = () => {
  const user_role = useAppSelector((state) => state.user.role);
  return (
    <div className="w-full max-w-[1300px] p-3  mx-auto bg-white">
      <Banners />
      <Categories />
      <Populars />
      {user_role === "buyer" && <NewArrivals />}
      {user_role === "buyer" && <Showcase />}
    </div>
  );
};

export default Homepage;
