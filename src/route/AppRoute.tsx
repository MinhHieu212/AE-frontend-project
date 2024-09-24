import React from "react";
import { Route, Routes } from "react-router-dom";
import { useAppSelector } from "../store/store";
import MainLayout from "../layout/MainLayout";
import Homepage from "../pages/(buyer)/home-page/Homepage";
import AddProduct from "../pages/(seller)/add-product/AddProduct";
import ProductDetails from "../pages/(buyer)/product-details/ProductDetails";
import ProductList from "../pages/(seller)/product-list/ProductList";
import SignIn from "../pages/(auth)/sign-in/SignIn";
import SignUp from "../pages/(auth)/sign-up/SignUp";
import SellerSignIn from "../pages/(auth)/sign-in/SellerSignIn";
import SellerSignUp from "../pages/(auth)/sign-up/SellerSignUp";

const AppRoute = () => {
  const userRole = useAppSelector((state) => state.roles.user_role);

  return (
    <Routes>
      {(userRole === "anonymous" || userRole === "buyer") &&
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
    path: "/accessed-ecommerce",
    element: (
      <MainLayout>
        <Homepage />
      </MainLayout>
    ),
  },
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
    path: "/sign-in",
    element: <SignIn />,
  },
  {
    path: "/seller/sign-in",
    element: <SellerSignIn />,
  },
  {
    path: "/seller/sign-up",
    element: <SellerSignUp />,
  },
  {
    path: "/sign-up",
    element: <SignUp />,
  },
  {
    path: "*",
    element: (
      <MainLayout>
        <div className="w-full min-h-[80dvh] h-full flex flex-col items-center justify-center">
          <img
            src="https://www.vizion.com/wp-content/smush-webp/2018/09/shutterstock_479042983.jpg.webp"
            alt=""
            height={400}
          />
        </div>
      </MainLayout>
    ),
  },
];

const seller_route = [
  {
    path: "/",
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    ),
  },
  {
    path: "/accessed-ecommerce",
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    ),
  },
  {
    path: "/products",
    element: (
      <MainLayout>
        <ProductList />
      </MainLayout>
    ),
  },
  {
    path: "/products/:slug",
    element: (
      <MainLayout>
        <ProductDetails />
      </MainLayout>
    ),
  },
  {
    path: "/products/add-product",
    element: (
      <MainLayout>
        <AddProduct />
      </MainLayout>
    ),
  },
  {
    path: "*",
    element: (
      <MainLayout>
        <div className="w-full min-h-[80dvh] h-full flex flex-col items-center justify-center">
          <img
            src="https://www.vizion.com/wp-content/smush-webp/2018/09/shutterstock_479042983.jpg.webp"
            alt=""
            height={400}
          />
        </div>
      </MainLayout>
    ),
  },
];
