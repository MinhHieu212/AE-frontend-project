import { Box, Grid2, useMediaQuery } from "@mui/material";
import DOMPurify from "dompurify";
import React, { useEffect, useState } from "react";
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
import ProdBottom from "./components/ProdBottom";
import { getProductById } from "../../../api/ProductApi";
import { toast } from "../../../utils/Toastify";

const ProductDetails = () => {
  const [loading, setLoading] = useState<boolean>(false);
  const { slug: product_id } = useParams();
  const useDispatch = useAppDispatch();
  const description = useAppSelector((state) => state.detail.description);
  const product_detail = useAppSelector((state) => state.detail);
  const isMobile = useMediaQuery("(max-width:890px)");

  // useEffect(() => {
  //   const callApi = async () => {
  //     setLoading(true);
  //     try {
  //       const response_data = await getProductById(product_id);
  //       const productsData = response_data;
  //       const prod_details = {
  //         name: productsData?.name,
  //         description: productsData?.description,
  //         brandName: productsData?.brandName,
  //         sellingTypes: productsData?.sellingTypes,
  //         imageURLs: productsData?.variants[1].imageURLs,
  //         packages_size: {
  //           length: productsData?.dimensions.length,
  //           width: productsData?.dimensions.width,
  //           height: productsData?.dimensions.height,
  //         },
  //         categories: productsData?.categories,
  //         haveVariants: productsData?.hasVariants,
  //         options: productsData.options,
  //         variants: productsData?.variants,
  //       };
  //       const initialSeleted = {
  //         price: 1231,
  //         sale_price: 1541,
  //         quantity: 224,
  //         variant_option: { COLOR: "midnight", RAM: "4GB", STORAGE: "64GB" },
  //       };
  //       useDispatch(initialProductDetail({ value: prod_details }));
  //       useDispatch(initialSeletedVariant({ value: initialSeleted }));
  //     } catch (error: any) {
  //       toast.error(error.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  //   callApi();
  // }, [product_id]);

  console.log("products", product_detail);

  return (
    <div className={`w-full h-full max-w-[1300px] mx-auto my-5 sidebar`}>
      <Grid2 container spacing={2} alignItems="sm:flex-start">
        <Grid2 size={{ xs: 12, sm: 12, md: 7 }}>
          <ImageGallery />
          {!isMobile && (
            <Box className="mt-5 min-h-[200px] text-sm w-full border-2 border-solid border-gray-100 rounded-lg p-5 py-3 shadow-lg">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
              />
            </Box>
          )}
        </Grid2>
        <Grid2
          size={{ xs: 12, sm: 12, md: 5 }}
          className="px-3 sm:px-5 sticky top-5"
        >
          <ProductVariants />
          <ProdDetails />
          <ProdReviews />
          {isMobile && (
            <Box className="mt-5 min-h-[200px] text-sm w-full border-2 border-solid border-gray-100 rounded-lg p-5 py-3 shadow-lg">
              <div
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(description),
                }}
              />
            </Box>
          )}
        </Grid2>
      </Grid2>
      <Grid2 className={`w-full`} container spacing={2} alignItems="flex-start">
        <Grid2 size={12} className="px-5">
          <RelatedProducts />
        </Grid2>
      </Grid2>
      <ProdBottom />
    </div>
  );
};

export default ProductDetails;
