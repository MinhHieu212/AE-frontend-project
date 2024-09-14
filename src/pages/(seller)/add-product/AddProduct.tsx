import React, { useEffect, useState } from "react";
import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { useProductForm } from "./hooks/useProductForm";
import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import ProdPackages from "./components/ProdPackages";
import ProdSellingType from "./components/ProdSellingType";
import ProdInventory from "./components/ProdInventory";
import ConfirmDialogButton from "./components/PopupConfirm";
import PopupDiscardButton from "./components/PopupDiscard";
import NewProdimages from "./components/NewProdImages";
import ProdVariantTable from "./components/ProdVariantTable";
import ProdVariants from "./components/ProdVariants";
import { useSelector } from "react-redux";
import { useAppSelector } from "../../../store/store";

interface SubHeaderProps {
  unSave: boolean;
}
const SubHeader: React.FC<SubHeaderProps> = ({ unSave }) => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-start gap-3 px-5">
      <ConfirmDialogButton />
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
  const product_variant = useAppSelector(
    (state) => state.variants.product_variant
  );

  function handleAddNewProduct() {
    console.log(JSON.stringify(product_variant, null, 2));
    setStartValidate(true);
    if (validateForm()) {
      submitForm();
    } else {
      console.log(JSON.stringify(errors, null, 2));
    }
  }

  return (
    <div className="w-full items-center justify-end gap-3 flex px-4 my-[50px]">
      <PopupDiscardButton />
      <div className="flex items-center justify-center gap-5">
        <Button
          size="large"
          disabled={loading}
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
      <div className="w-full h-full my-2 scrollBar">
        <SubHeader unSave={unSave} />
        <div className="w-full flex items-start justify-center p-2 gap-3">
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
            <ProdSellingType
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            <NewProdimages
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
            <ProdInventory
              formData={formData}
              updateField={updateField}
              errors={errors}
              startValidate={startValidate}
            />
          </div>
        </div>
        <ProdVariants />
        <ProdVariantTable />
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
  );
};

export default AddProduct;
