import React from "react";
import Products from "../pages/(seller)/product-list/ProductList";
import AddProduct from "../pages/(seller)/add-product/AddProduct";
import Homepage from "../pages/(buyer)/home-page/Homepage";
import MainLayout from "../layout/MainLayout";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/store";
import ProductDetails from "../pages/(buyer)/product-details/ProductDetails";

const AppRoute = () => {
  const userRole = useAppSelector((state) => state.roles.user_role);

  return (
    <Routes>
      {userRole === "buyer" &&
        buyer_route.map((item, index) => (
          <Route path={item.path} element={item.element} key={index} />
        ))}
      {userRole === "seller" &&
        seller_route.map((item, index) => (
          <Route path={item.path} element={item.element} key={index} />
        ))}
    </Routes>
  );
};

export default AppRoute;

const buyer_route = [
  {
    path: "/",
    element: (
      <MainLayout>
        <Homepage />
      </MainLayout>
    ),
  },
  {
    path: "/homepage",
    element: (
      <MainLayout>
        <Homepage />
      </MainLayout>
    ),
  },
  {
    path: "/:slug",
    element: (
      <MainLayout>
        <ProductDetails />
      </MainLayout>
    ),
  },
  {
    path: "/accessed-ecommerce",
    element: (
      <MainLayout>
        <Homepage />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img
          src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png"
          alt=""
          height={400}
        />
      </div>
    ),
  },
];

const seller_route = [
  {
    path: "/products",
    element: (
      <MainLayout>
        <Products />
      </MainLayout>
    ),
  },
  {
    path: "/product-list/add-product",
    element: (
      <MainLayout>
        <AddProduct />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <img
          src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png"
          alt=""
          height={400}
        />
      </div>
    ),
  },
];
