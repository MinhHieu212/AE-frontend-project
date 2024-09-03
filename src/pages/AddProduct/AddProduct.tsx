import React, { useEffect, useState } from "react";
import { Alert, Box, Button } from "@mui/material";
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
import { createProduct } from "../../api/ProductApi";
import { Console } from "console";
import { createPortal } from "react-dom";
import { toast } from "../../utils/Toastify";

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
  submitForm: () => void;
  validateForm: () => boolean;
  errors: any;
  isValid: boolean;
  setStartValidate: any;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  submitForm,
  validateForm,
  errors,
  isValid = false,
  setStartValidate,
}) => {
  function handleAddNewProduct() {
    setStartValidate(true);
    if (validateForm()) {
      submitForm();
    } else {
      console.log(JSON.stringify(errors, null, 2));
    }
  }
  return (
    <div className="w-full items-center justify-between flex px-4 mt-5">
      <Button size="large" className="rounded-md capitalize" variant="outlined">
        Discard
      </Button>
      <div className="flex items-center justify-center gap-5">
        <Button
          size="large"
          variant="outlined"
          className="rounded-md capitalize"
        >
          Clone
        </Button>
        <Button
          size="large"
          className="rounded-md capitalize"
          variant="contained"
          // disabled={!isValid}
          onClick={() => handleAddNewProduct()}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

export const useProductForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    sellingType: "In-store selling only",
    category: {
      level_1: { name: null, index: null },
      level_2: { name: null, index: null },
    },
    inventory: { quantity: null, sku: "" },
    packages_weight: null,
    packages_size: { length: null, width: null, height: null },
    pricing: { msrp: null, salePrice: null, price: null },
    images: [],
  });

  const [errors, setErrors] = useState({});

  const updateField = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const validateForm = () => {
    const newErrors: any = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required.";
    } else if (formData.name.length < 5 || formData.name.length > 120) {
      newErrors.name = "Name must be between 5 and 120 characters.";
    }

    if (!formData.description.trim()) {
      newErrors.description = "Description is required.";
    } else if (
      formData.description.length < 200 ||
      formData.description.length > 1000
    ) {
      newErrors.description =
        "Description must be between 200 and 1000 characters.";
    }

    if (!formData.category.level_1) {
      newErrors.category = "Category is required.";
    }

    if (
      formData.inventory.quantity === null ||
      formData.inventory.quantity < 0
    ) {
      newErrors.inventory =
        "Quantity is required and must be a positive integer.";
    } else if (!Number.isInteger(formData.inventory.quantity)) {
      newErrors.inventory = "Quantity must be a whole number.";
    }
    if (formData.images.length === 0) {
      newErrors.images = "Image is required.";
    } else if (formData.images.length > 10) {
      newErrors.images = "You can upload up to 10 images.";
    }
    if (formData.images.some((image: any) => image.size > 10 * 1024 * 1024)) {
      newErrors.images = "Each image must be smaller than 10MB.";
    }

    const validatePackageDimension = (dimension: any, name: string) => {
      if (
        dimension !== null &&
        (!Number.isFinite(dimension) || dimension < 0)
      ) {
        newErrors[name] = "Package dimensions must be positive numbers.";
      }
    };
    validatePackageDimension(formData.packages_weight, "packages_weight");
    validatePackageDimension(
      formData.packages_size.length,
      "packages_size.length"
    );
    validatePackageDimension(
      formData.packages_size.width,
      "packages_size.width"
    );
    validatePackageDimension(
      formData.packages_size.height,
      "packages_size.height"
    );

    const { msrp, salePrice, price } = formData.pricing;
    if (price === null) {
      newErrors.pricing = "Price is required.";
    }
    if (msrp === null) {
      newErrors.pricing = "MSRP price is required.";
    }
    if (price !== null && (!Number.isFinite(price) || price < 0)) {
      newErrors.pricing = "Price must be a positive number.";
    }
    if (salePrice !== null && (!Number.isFinite(salePrice) || salePrice < 0)) {
      newErrors.pricing = "Sale price must be a positive number.";
    }
    if (msrp !== null && (!Number.isFinite(msrp) || msrp < 0)) {
      newErrors.pricing = "MSRP must be a positive number.";
    }
    if (price !== null && salePrice !== null && price < salePrice) {
      newErrors.pricing = "Sale price must be less than Price";
    }
    if (price !== null && msrp !== null && price < msrp) {
      newErrors.pricing = "MSRP price must be less than Price";
    }
    if (salePrice !== null && msrp !== null && salePrice < msrp) {
      newErrors.pricing = "MSRP price must be less than Sale price";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const submitForm = async () => {
    if (validateForm()) {
      const convertedData = {
        name: formData.name,
        imageURL: null,
        primaryImageURL: null,
        description: formData.description,
        msrp: formData.pricing.msrp,
        salePrice: formData.pricing.salePrice,
        price: formData.pricing.price,
        quantity: formData.inventory.quantity,
        sellingTypes: formData.sellingType,
        categories: [
          formData.category.level_1.index,
          formData.category.level_2.index,
        ],
        dimensions: {
          weight: formData.packages_weight,
          length: formData.packages_size.length,
          width: formData.packages_size.width,
          height: formData.packages_size.height,
        },
        sku: formData.inventory.sku,
      };
      console.log("Form submitted:", JSON.stringify(convertedData, null, 2));
      const response_data = await createProduct(convertedData);
      if (response_data.id) {
        console.log("SUCCESS: ", response_data.id);
        toast.success("New product added successfully");
      }
    } else {
      console.log("Validation errors:", errors);
    }
  };

  return { formData, updateField, submitForm, validateForm, errors };
};

const AddProduct = () => {
  const { formData, updateField, submitForm, validateForm, errors } =
    useProductForm();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [startValidate, setStartValidate] = useState<boolean>(false);

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1430px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 overflow-y-scroll">
        <SubHeader />
        <div className="w-full flex items-start justify-center p-2 gap-3 h-full">
          <div className="w-1/2 flex flex-col items-center justify-start">
            <MantineProvider>
              <ProdDescription
                formData={formData}
                updateField={updateField}
                errors={errors}
                startValidate={startValidate}
              />
            </MantineProvider>
            <ProdCategory
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
            <ProdInventory
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
            <ProdSellingType
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdImages
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
            <ProdPackages
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
            <ProdPricing
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
            <ActionButtons
              submitForm={submitForm}
              validateForm={validateForm}
              errors={errors}
              isValid={isValid}
              setStartValidate={setStartValidate}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
