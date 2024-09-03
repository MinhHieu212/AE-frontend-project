import React, { useState } from "react";
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
import { MantineProvider } from "@mantine/core";

const SubHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-start gap-3 px-5">
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

interface ActionButtonsProps {
  submitForm: () => void; // Ensure this matches the prop you're passing
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ submitForm }) => (
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
        onClick={() => submitForm()}
      >
        Add Product
      </Button>
    </div>
  </div>
);

export const useProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellingType: "",
    category: { level_1: "", level_2: "" },
    inventory: { quantity: null, sku: "" },
    packages_weight: null,
    packages_size: { length: null, width: null, height: null },
    pricing: { msrp: null, salePrice: null, price: null },
    images: [],
  });

  const updateField = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const submitForm = () => {
    console.log("Form submitted:", formData);
  };

  return { formData, updateField, submitForm };
};

const AddProduct = () => {
  const { formData, updateField, submitForm } = useProductForm();

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1430px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 overflow-y-scroll">
        <SubHeader />
        <div className="w-full flex items-start justify-center p-2 gap-3 h-full">
          <div className="w-1/2 flex flex-col items-center justify-start">
            <MantineProvider>
              <ProdDescription formData={formData} updateField={updateField} />
            </MantineProvider>
            <ProdCategory formData={formData} updateField={updateField} />
            <ProdInventory formData={formData} updateField={updateField} />
            <ProdSellingType formData={formData} updateField={updateField} />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdImages formData={formData} updateField={updateField} />
            <ProdPackages formData={formData} updateField={updateField} />
            <ProdPricing formData={formData} updateField={updateField} />
            <ActionButtons submitForm={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
