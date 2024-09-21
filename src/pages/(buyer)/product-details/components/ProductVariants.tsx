import React, { useState } from "react";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoHexagon,
} from "@tabler/icons-react";
import { Box, Button, Grid2, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../store/store";

interface Variant {
  id: string;
  productId: string;
  primary: boolean;
  variantTypes: string;
  value: string;
  imageURLs: string[];
  variantOptions: any;
}

const VariantDisplay: React.FC<{ variants: any; selected_variant: any }> = ({
  variants,
  selected_variant,
}) => {
  if (!variants) return <></>;

  const sub_variant = variants.filter(
    (item: any) =>
      item.value === selected_variant.variant_option[item.variantTypes]
  );

  return (
    <>
      <Box className="flex flex-wrap items-center justify-center gap-2">
        {variants.map((item: any) => (
          <Box
            key={item.id}
            className="p-4 border-2 border-solid border-gray-800 flex items-center justify-center"
          >
            {item.value}
          </Box>
        ))}
      </Box>
      <VariantDisplay
        variants={sub_variant.variantOptions}
        selected_variant={selected_variant}
      />
      <VariantDisplay
        variants={sub_variant.optionValues}
        selected_variant={selected_variant}
      />
    </>
  );
};

const ProductVariants = () => {
  const product_details = useAppSelector((state) => state.details);
  const selected_variant = useAppSelector((state) => state.selected_variants);
  const [like, setLike] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="w-[70%]">
          <Typography variant="h4" component="h2">
            {product_details?.name || "no name"}
          </Typography>
          <p className="font-semibold text-gray-400 my-0">
            {product_details.categories[0]?.name || "no categories"}
          </p>
        </div>
        <Stack className="w-[30%]">
          <p className="font-semibold my-0 text-[25px] text-right text-gray-600 line-through">
            ${selected_variant.sale_price}
          </p>
          <p className="font-semibold text-lime my-0 text-[35px] text-right">
            ${selected_variant.price}
          </p>
        </Stack>
      </div>

      <div className="flex flex-col item-center justify-start">
        <VariantDisplay
          variants={product_details.variants}
          selected_variant={selected_variant}
        />
      </div>

      <div className="w-full flex items-center justify-start gap-1">
        <IconInfoHexagon size={22} color={"gray"} />
        <span className="font-medium text-gray-500">20 item left!</span>
      </div>

      <p className="mt-10 mb-1 text-sm text-gray-500">
        Delivery on Match 5th-11th
      </p>
      <div className="w-full flex items-center justify-center gap-2 ">
        <Button
          className="bg-black text-white w-full capitalize"
          variant="contained"
          size="large"
        >
          Add to cart
        </Button>
        <div
          onClick={() => setLike((prev) => !prev)}
          className="flex items-center justify-center p-2 bg-slate-100 z-100 border-[0.5px] rounded-md border-solid border-black bg-opacity-80 cursor-pointer"
        >
          {like ? <IconHeart /> : <IconHeartFilled />}
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;
