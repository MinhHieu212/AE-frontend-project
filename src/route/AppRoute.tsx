import React from "react";
import Products from "../pages/Products/Products";
import AddProduct from "../pages/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import OwnerLayout from "../layout/OwnerLayout/OwnerLayout";
import Homepage from "../pages/Homepage/Homepage";
import BuyerLayout from "../layout/BuyerLayout/BuyerLayout";
import TestDemo from "../test/TestDemo";
interface AppRouteProps {
  user_role: string[];
}

const AppRoute = ({ user_role = ["buyer"] }: AppRouteProps) => {
  return (
    <Routes>
      {public_route.map((item, index) => (
        <Route path={item.path} element={item.element} key={index} />
      ))}
      {user_role.includes("buyer") &&
        buyer_route.map((item, index) => (
          <Route path={item.path} element={item.element} key={index} />
        ))}
      {user_role.includes("owner") &&
        owner_route.map((item, index) => (
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
      <BuyerLayout>
        <Homepage />
      </BuyerLayout>
    ),
  },
  {
    path: "/homepage",
    element: (
      <BuyerLayout>
        <Homepage />
      </BuyerLayout>
    ),
  },
  {
    path: "/accessed-ecommerce",
    element: (
      <BuyerLayout>
        <Homepage />
      </BuyerLayout>
    ),
  },
];

const owner_route = [
  {
    path: "/products",
    element: (
      <OwnerLayout>
        <Products />
      </OwnerLayout>
    ),
  },
  {
    path: "/products/add-product",
    element: (
      <OwnerLayout>
        <AddProduct />
      </OwnerLayout>
    ),
  },
];

const public_route = [
  {
    path: "/test",
    element: (
      <div className="w-full h-full flex flex-col items-center justify-center">
        <TestDemo />
      </div>
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
