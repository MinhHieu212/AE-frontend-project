import { Box, Grid2 } from "@mui/material";
import DOMPurify from "dompurify";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import ImageGallery from "./components/ImageGallery";
import ProductVariants from "./components/ProductVariants";
import { constant_product_detail } from "../../../constants/constant_product_detail";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import { initialProductDetail } from "../../../store/slices/productDetailSlice";
import { initialSeletedVariant } from "../../../store/slices/selectedVariantSlice";
import ProdDetails from "./components/ProdDetails";
import ProdReviews from "./components/ProdReviews";
import RelatedProducts from "./components/RelatedProducts";

const ProductDetails = () => {
  const { slug } = useParams();
  const useDispatch = useAppDispatch();
  const description = useAppSelector((state) => state.detail).description;

  useEffect(() => {
    const initialValue = {
      name: constant_product_detail?.name,
      description: constant_product_detail?.description,
      brandName: constant_product_detail?.brandName,
      sellingTypes: constant_product_detail?.sellingTypes,
      imageURLs: constant_product_detail?.variants[1].imageURLs,
      packages_size: {
        length: constant_product_detail?.dimensions.length,
        width: constant_product_detail?.dimensions.width,
        height: constant_product_detail?.dimensions.height,
      },
      categories: constant_product_detail?.categories,
      haveVariants: constant_product_detail?.hasVariants,
      variants: constant_product_detail?.variants,
    };

    const initialSeleted = {
      price: 1231,
      sale_price: 1541,
      quantity: 224,
      variant_option: { COLOR: "midnight", RAM: "4GB", STORAGE: "64GB" },
    };

    useDispatch(initialProductDetail({ value: initialValue }));
    useDispatch(initialSeletedVariant({ value: initialSeleted }));
  }, []);

  return (
    <div className={`w-full h-full max-w-[1300px] mx-auto my-5 sidebar`}>
      <Grid2 className={`w-full`} container spacing={2} alignItems="flex-start">
        <Grid2 size={7}>
          <ImageGallery />
          <Box className="mt-5 min-h-[200px] text-sm w-full border-2 border-solid border-gray-100 rounded-lg p-5 py-3 shadow-lg">
            <div
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(description),
              }}
            />
          </Box>
        </Grid2>
        <Grid2 size={5} className="px-5 sticky top-5">
          <ProductVariants />
          <ProdDetails />
          <ProdReviews />
        </Grid2>
      </Grid2>
      <Grid2 className={`w-full`} container spacing={2} alignItems="flex-start">
        <Grid2 size={12} className="px-5">
          <RelatedProducts />
        </Grid2>
      </Grid2>
    </div>
  );
};

export default ProductDetails;
