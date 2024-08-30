import { Button } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full h-full bg-slate-100 p-3">
      <div className="flex items-center justify-between">
        <span>Products</span>
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
