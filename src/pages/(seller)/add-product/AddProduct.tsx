import React from "react";
import { Box, Button } from "@mui/material";
import { MantineProvider } from "@mantine/core";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import ProdDescription from "./components/ProdDescription";
import ProdCategory from "./components/ProdCategory";
import ProdPackages from "./components/ProdPackages";
import ProdSellingType from "./components/ProdSellingType";
import ProdInventory from "./components/ProdInventory";
import ProdVariantTable from "./components/ProdVariantTable";
import ProdVariants from "./components/ProdVariants";
import ProdImages from "./components/ProdImages";
import ProdBranchFeature from "./components/ProdBranchFeature";
import { resetProductData } from "../../../store/slices/productSlice";
import { IconArrowLeft } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import CustomDialog from "../../../components/CustomDialog";
import ProdSpecification from "./components/ProdSpecification";
import ProdPricing from "./components/ProdPricing";

const SubHeader = () => {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-start gap-3 px-5">
      <CustomDialog
        onCancel={() => {}}
        onAccept={() => navigate("/products")}
        title="Confirm Action"
        content="Are you sure you want to return to the product list?"
      >
        <div className="m-0">
          <Box className="rounded-lg w-[50px] h-[50px] flex items-center justify-center border-[2px] border-solid border-gray-400 px-0">
            <IconArrowLeft size={25} color="gray" />
          </Box>
        </div>
      </CustomDialog>
      <div>
        <p className="text-[gray] my-1 text-sm">Back to product list</p>
        <p className="font-medium text-xl my-0">Add New Product</p>
      </div>
    </div>
  );
};

const ActionButtons = () => {
  const useDispatch = useAppDispatch();
  const product = useAppSelector((state) => state.product);
  const variants = useAppSelector((state) => state.variants.variants);
  const variants_table = useAppSelector(
    (state) => state.variants.combineVariantsTable
  );

  const variantsPayload = variants_table.map((variant) => {
    const variantOptions = Object.entries(variant)
      .filter(
        ([key]) =>
          !["quantity", "price", "salePrice", "sku", "mrspPrice"].includes(key)
      )
      .map(([variantTypes, value]) => ({
        variantTypes,
        value: String(value),
      }));

    return {
      quantityAvailable: variant.quantity,
      price: variant.price,
      salePrice: variant.salePrice,
      sku: variant.sku,
      mrsp: variant.mrspPrice,
      imageURLs: [],
      variantOptions,
    };
  });

  const optionsPayload = variants.map((item, indez) => {
    return {
      [item.type]: item.values,
    };
  }, {});

  let payload = {
    name: product.name,
    imageURL: product.images.map((image) => image.url),
    primaryImageURL: product?.primaryImage?.url,
    description: product.description,
    brandName: product.brand,
    sellingTypes: product.sellingType,
    inventory: product.inventory,
    collections: product.collections,
    categories: [
      product.category.level_1.index,
      product.category.level_2.index,
    ],
    dimensions: {
      weight: product.packages_weight,
      length: product.packages_size.length,
      width: product.packages_size.width,
      height: product.packages_size.height,
    },
    hasVariants: product.haveVariants,
    variants: variantsPayload,
    options: optionsPayload,
  };

  function handleAddNewProduct() {
    console.log(JSON.stringify(payload, null, 2));
  }

  function handleDiscardAddProduct() {
    useDispatch(resetProductData());
  }

  return (
    <div className="w-full items-center justify-end gap-3 flex px-4 my-[30px] mb-[10px]">
      <CustomDialog
        onCancel={() => {}}
        onAccept={() => handleDiscardAddProduct()}
        title="Confirm Action"
        content="Are you sure you want to discard this product?"
      >
        <Button className="rounded-md capitalize" variant="outlined">
          Discard
        </Button>
      </CustomDialog>
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
  return (
    <div className="flex flex-col items-center justify-start w-full max-w-[1300px] h-full p-3 mx-auto">
      <div className="w-full h-full my-2 scrollBar">
        <SubHeader />
        <div className="w-full flex items-start justify-center p-2 gap-3">
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdCategory />
            <MantineProvider>
              <ProdDescription />
            </MantineProvider>
            <ProdPackages />
            <ProdPricing />
          </div>
          <div className="w-1/2 flex flex-col items-center justify-start">
            <ProdBranchFeature />
            <ProdInventory />
            <ProdSellingType />
            <ProdImages />
            <ProdSpecification />
          </div>
        </div>
        <ProdVariants />
        <ProdVariantTable />
        <ActionButtons />
      </div>
    </div>
  );
};

export default AddProduct;
