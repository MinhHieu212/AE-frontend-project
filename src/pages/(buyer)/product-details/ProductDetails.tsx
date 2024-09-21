import { Box, Grid2 } from "@mui/material";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import ProductVariants from "./components/ProductVariants";
import { fake_data_product_detail_v2 } from "../../../fake_data/fake_data_product_detail_v2";
import { useAppDispatch } from "../../../store/store";
import { initialProductDetails } from "../../../store/slices/productDetailsSlice";
import { initialSeletedVariant } from "../../../store/slices/selectedVariantSlice";

const ProductDetails = () => {
  const { slug } = useParams();
  const useDispatch = useAppDispatch();

  const initialValue = {
    name: fake_data_product_detail_v2?.name,
    description: fake_data_product_detail_v2?.description,
    brandName: fake_data_product_detail_v2?.brandName,
    sellingTypes: fake_data_product_detail_v2?.sellingTypes,
    imageURLs: fake_data_product_detail_v2?.variants[0].imageURLs,
    packages_size: {
      length: fake_data_product_detail_v2?.dimensions.length,
      width: fake_data_product_detail_v2?.dimensions.width,
      height: fake_data_product_detail_v2?.dimensions.height,
    },
    categories: fake_data_product_detail_v2?.categories,
    haveVariants: fake_data_product_detail_v2?.hasVariants,
    variants: fake_data_product_detail_v2?.variants,
  };

  const initialSeleted = {
    price: 1231,
    sale_price: 1541,
    quantity: 224,
    variant_option: { COLOR: "midnight", RAM: "4GB", STORAGE: "64GB" },
  };

  useDispatch(initialProductDetails({ value: initialValue }));
  useDispatch(initialSeletedVariant({ value: initialSeleted }));

  return (
    <div className="w-full h-full max-w-[1430px] mx-auto my-5 py-10">
      <Grid2 className="w-full" container spacing={2}>
        <Grid2 size={7}>
          <ImageGallery />
        </Grid2>
        <Grid2 size={5} className="px-5">
          <ProductVariants />
        </Grid2>
      </Grid2>
      <Box className="w-full min-h-[80vh]"></Box>
    </div>
  );
};

export default ProductDetails;
