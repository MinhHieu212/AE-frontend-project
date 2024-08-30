import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import { product_reponse } from "./product_reponse";

const Products = () => {
  const navigate = useNavigate();

  console.log(product_reponse);

  return (
    <div className="w-full h-full p-3">
      <div className="flex h-[50px] items-center justify-between">
        <h2>Products</h2>
        <Button
          variant="contained"
          onClick={() => navigate("/products/add-product")}
        >
          Add new Product
        </Button>
      </div>
    </div>
  );
};

export default Products;
