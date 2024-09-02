import React from "react";
import { Box, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { IconArrowLeft } from "@tabler/icons-react";
import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import ProdPricing from "./components/ProdPricing";
import ProdPackages from "./components/ProdPackages";
import ProdImages from "./components/ProdImages";
import ProdSellingType from "./components/ProdSellingType";
import ProdInventory from "./components/ProdInventory";

const SubHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="mr-auto flex items-center justify-center gap-3 px-5">
      <Box
        className="rounded-lg w-[50px] h-[50px] flex items-center justify-center border-[2px] border-solid border-gray-400 px-0"
        onClick={() => navigate("/products")}
      >
        <IconArrowLeft size={25} color="gray" />
      </Box>
      <div>
        <p className="text-[gray] my-1 text-sm">Back to product list</p>
        <p className="font-medium text-xl my-0">Add New Product</p>
      </div>
    </div>
  );
};

const ActionButtons = () => (
  <div className="w-full items-center justify-between flex px-4 mt-5">
    <Button size="large" className="rounded-md capitalize" variant="outlined">
      Discard
    </Button>
    <div className="flex items-center justify-center gap-5">
      <Button size="large" variant="outlined" className="rounded-md capitalize">
        Clone
      </Button>
      <Button
        size="large"
        className="rounded-md capitalize"
        variant="contained"
      >
        Add Product
      </Button>
    </div>
  </div>
);

const AddProduct = () => {
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1430px] h-full p-3 mx-auto">
      <SubHeader />
      <div className="w-full flex items-start justify-center p-2 gap-3 h-full my-2 overflow-y-scroll">
        <div className="w-1/2 flex flex-col items-center justify-start">
          <ProdDescription />
          <ProdCategory />
          <ProdInventory />
          <ProdSellingType />
        </div>
        <div className="w-1/2 flex flex-col items-center justify-start">
          <ProdImages />
          <ProdPackages />
          <ProdPricing />
        </div>
      </div>
      <ActionButtons />
    </div>
  );
};

export default AddProduct;
