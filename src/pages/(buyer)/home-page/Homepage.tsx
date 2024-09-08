import React from "react";
import BannerCarousel from "./components/BannerCarousel";
import NewArrivalsProducts from "./components/NewArrivalsProducts";
import Categories from "./components/Categories";
import PopularProducts from "./components/PopularProducts";
import ProductShowcase from "./components/ProductShowcase ";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { setRole } from "../../../store/slices/roleSlice";

const Homepage = () => {
  const dispatch = useAppDispatch();
  const userRole = useAppSelector((state) => state.role.user_role);
  const handleSetRole = () => {
    dispatch(setRole({ user_role: "admin" }));
  };

  return (
    <div className="w-full max-w-[1430px] p-3  mx-auto bg-white">
      <BannerCarousel />
      <Categories />
      <PopularProducts />
      <NewArrivalsProducts />
      <ProductShowcase />
    </div>
  );
};

export default Homepage;
