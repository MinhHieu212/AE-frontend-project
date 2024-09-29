import React, { useState } from "react";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoHexagon,
} from "@tabler/icons-react";
import { Button, Stack, Typography } from "@mui/material";
import { useAppSelector } from "../../../../store/store";

const ProductVariants = () => {
  const product_details = useAppSelector((state) => state.detail);
  const selected_variant = useAppSelector((state) => state.selected_variants);
  const product_details_options = useAppSelector(
    (state) => state.detail.options
  );
  const [like, setLike] = useState<boolean>(false);

  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="flex-grow">
          <Typography
            variant="h4"
            component="h2"
            className="text-[22px] font-semibold"
          >
            {product_details?.name || "no name"}
          </Typography>
          <p className="font-medium text-sm text-gray-400 my-0">
            {product_details.categories[0]?.name || "no categories"}
          </p>
        </div>
        <Stack className="w-[200px]">
          <p className="font-semibold my-0 text-[22px] text-right text-gray-600 line-through">
            ${selected_variant.sale_price}
          </p>
          <p className="font-semibold text-lime my-0 text-[30px] text-right">
            ${selected_variant.price}
          </p>
        </Stack>
      </div>

      <div className="flex flex-col item-center justify-start mb-5">
        <div className="space-y-4">
          {product_details_options.length > 0 &&
            product_details_options?.map((option: any) => (
              <div key={option.name} className="flex items-center space-x-4">
                <span className="font-bold w-24">{option.name}:</span>
                <div className="flex flex-wrap gap-2">
                  {option?.values?.map((value: any, index: any) => (
                    <span
                      key={index}
                      className="px-3 py-1 font-normal rounded-full border-[1px] border-gray-400 border-solid"
                    >
                      {value}
                    </span>
                  ))}
                </div>
              </div>
            ))}
        </div>
      </div>

      <div className="w-full flex items-center justify-start gap-1 mt-2">
        <IconInfoHexagon size={22} color={"gray"} />
        <span className="font-medium text-gray-500 text-sm ">
          20 item left!
        </span>
      </div>

      <p className="mb-1 text-sm text-gray-500">Delivery on Match 5th-11th</p>
      <div className="w-full flex items-center justify-center gap-2 mt-2 ">
        <Button
          className="bg-black text-white w-full capitalize p-2 h-[40px]"
          variant="contained"
        >
          Add to cart
        </Button>
        <div
          onClick={() => setLike((prev) => !prev)}
          className="flex items-center h-[40px] w-[40px] justify-center p-2 bg-slate-100 z-100 border-[0.5px] rounded-lg border-solid border-black bg-opacity-80 cursor-pointer"
        >
          {like ? <IconHeart size={18} /> : <IconHeartFilled size={18} />}
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;
