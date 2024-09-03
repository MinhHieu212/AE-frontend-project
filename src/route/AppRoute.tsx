import React from "react";
import Products from "../pages/Products/Products";
import AddProduct from "../pages/AddProduct/AddProduct";
import { Route, Routes } from "react-router-dom";
import OwnerLayout from "../layout/OwnerLayout/OwnerLayout";
import Dashboard from "../pages/Dashboard/Dashboard";
import CustomerLayout from "../layout/CustomerLayout/CustomerLayout";

const route_list = [
  {
    path: "/",
    element: (
      <CustomerLayout>
        <Dashboard />
      </CustomerLayout>
    ),
  },
  {
    path: "/dashboard",
    element: (
      <CustomerLayout>
        <Dashboard />
      </CustomerLayout>
    ),
  },
  {
    path: "/accessed-ecommerce",
    element: (
      <CustomerLayout>
        <Dashboard />
      </CustomerLayout>
    ),
  },
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
  {
    path: "*",
    element: (
      <OwnerLayout>
        <div className="w-full h-full flex flex-col items-center justify-center">
          <img
            src="https://admiral.digital/wp-content/uploads/2023/08/404_page-not-found-1024x576.png"
            alt=""
            height={400}
          />
        </div>
      </OwnerLayout>
    ),
  },
];

const AppRoute = () => {
  return (
    <Routes>
      {route_list.map((item, index) => (
        <Route path={item.path} element={item.element} />
      ))}
    </Routes>
  );
};

export default AppRoute;
