import React from "react";
import { Button } from "@mui/material";
import { MantineProvider } from "@mantine/core";
import { useAppSelector } from "../../../store/store";
import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import ProdPackages from "./components/ProdPackages";
import ProdSellingType from "./components/ProdSellingType";
import ProdInventory from "./components/ProdInventory";
import ConfirmDialogButton from "./components/PopupConfirm";
import ProdVariantTable from "./components/ProdVariantTable";
import ProdVariants from "./components/ProdVariants";
import ProdImages from "./components/ProdImages";
import ProdBranchFeature from "./components/ProdBranchFeature";

const SubHeader = () => {
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

const ActionButtons = () => {
  const product = useAppSelector((state) => state.product);
  const variants = useAppSelector((state) => state.variants.variants);

  function handleAddNewProduct() {
    console.log(JSON.stringify(variants, null, 2));
    console.log(JSON.stringify(product, null, 2));
  }

  return (
    <div className="w-full items-center justify-end gap-3 flex px-4 my-[50px]">
      <Button className="rounded-md capitalize" variant="outlined">
        Discard
      </Button>
      <div className="flex items-center justify-center gap-5">
        <Button
          className="rounded-md capitalize"
          variant="contained"
          onClick={() => handleAddNewProduct()}
        >
          Add Product
        </Button>
      </div>
    </div>
  );
};

const AddProduct = () => {
  const cate_level_1 = useAppSelector(
    (state) => state.product.category.level_1
  );

  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1430px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 scrollBar">
        <SubHeader />
        <div className="w-full flex items-start justify-center p-2 gap-3">
          <div className="w-1/2 flex flex-col items-center justify-start">
            <MantineProvider>
              <ProdDescription />
            </MantineProvider>
            <ProdCategory />
            <ProdPackages />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdImages />
            <ProdBranchFeature />
            <ProdSellingType />

            <ProdInventory />
          </div>
        </div>
        {(cate_level_1.name === "Smart Phone" ||
          cate_level_1.name === "Electronic") && (
          <>
            <ProdVariants />
            <ProdVariantTable />
          </>
        )}
        <ActionButtons />
      </div>
    </div>
  );
};

export default AddProduct;
