import React, { useEffect, useState } from "react";
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
import { useProductForm } from "./hooks/useProductForm";
import { toast } from "../../utils/Toastify";

interface SubHeaderProps {
  unSave: boolean;
}
const SubHeader: React.FC<SubHeaderProps> = ({ unSave }) => {
  const navigate = useNavigate();
  const handleClickBack = () => {
    if (unSave) {
      toast.info("Unsave data");
    } else {
      navigate("/products");
    }
  };

  return (
    <div className="flex items-center justify-start gap-3 px-5">
      <Box
        className="rounded-lg w-[50px] h-[50px] flex items-center justify-center border-[2px] border-solid border-gray-400 px-0"
        onClick={() => handleClickBack()}
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
  resetFormData: () => void;
  errors: any;
  isValid: boolean;
  setStartValidate: any;
  loading: boolean;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({
  submitForm,
  validateForm,
  resetFormData,
  errors,
  isValid = false,
  setStartValidate,
  loading,
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
      <Button
        size="large"
        className="rounded-md capitalize"
        variant="outlined"
        onClick={() => resetFormData()}
      >
        Discard
      </Button>
      <div className="flex items-center justify-center gap-5">
        {/* <Button
          size="large"
          variant="outlined"
          className="rounded-md capitalize"
        >
          Clone
        </Button> */}
        <Button
          size="large"
          disabled={loading || !isValid}
          className="rounded-md capitalize"
          variant="contained"
          onClick={() => handleAddNewProduct()}
        >
          {loading ? "Processing" : "Add Product"}
        </Button>
      </div>
    </div>
  );
};

const AddProduct = () => {
  const {
    formData,
    updateField,
    submitForm,
    validateForm,
    resetFormData,
    checkUnSaveData,
    errors,
    loading,
  } = useProductForm();
  const [isValid, setIsValid] = useState<boolean>(false);
  const [startValidate, setStartValidate] = useState<boolean>(false);
  const unSave = checkUnSaveData();

  useEffect(() => {
    setIsValid(validateForm());
  }, [formData]);

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1430px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 scrollBar overflow-y-scroll">
        <SubHeader unSave={unSave} />
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
              resetFormData={resetFormData}
              loading={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
