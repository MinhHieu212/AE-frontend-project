import React from "react";
import Products from "../page/product/Products";
import AddProduct from "../page/product/AddProduct";
import { Route, Routes } from "react-router-dom";
import OwnerLayout from "../layout/OwnerLayout";
import Home from "../page/home/Home";
import CustomerLayout from "../layout/CustomerLayout";

const route_list = [
  {
    path: "/",
    element: (
      <CustomerLayout>
        <Home />
      </CustomerLayout>
    ),
  },
  {
    path: "/home",
    element: (
      <CustomerLayout>
        <Home />
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
