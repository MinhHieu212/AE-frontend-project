import React, { useState, useEffect } from "react";
import {
  IconHeart,
  IconHeartFilled,
  IconInfoHexagon,
} from "@tabler/icons-react";
import { Button, Stack, Typography } from "@mui/material";
import { useAppSelector, useAppDispatch } from "../../../../store/store";
import { ProductDetailsState } from "../../../../store/slices/productDetailSlice";
import {
  initialCurrentSelected,
  updateCurrentSelectedField,
} from "../../../../store/slices/currentSelectedSlice";

type Item = {
  name: string;
  values: string[];
};
function parseArrayToObject(array: Item[]): Record<string, string[]> {
  const result: Record<string, string[]> = {};
  array.forEach((item) => {
    result[item.name] = item.values;
  });
  return result;
}

const ProductVariants: React.FC = () => {
  const dispatch = useAppDispatch();
  const product_details = useAppSelector(
    (state) => state.detail
  ) as ProductDetailsState;
  const current_selected = useAppSelector((state) => state.current_selected);
  const [like, setLike] = useState<boolean>(false);

  const { name, categories, options, variants } = product_details;

  useEffect(() => {
    if (variants && variants.length > 0) {
      const firstVariant = variants[0];
      if (firstVariant && firstVariant.variantOptions) {
        dispatch(
          initialCurrentSelected({
            values: {
              selected_price: firstVariant.price,
              selected_sale_price: firstVariant.salePrice,
              selected_quantity: firstVariant.quantityAvailable,
              selected_images: firstVariant.imageURLs || [],
              selected_variants: firstVariant.variantOptions.reduce(
                (acc: any, option: any) => {
                  if (option && option.variantTypes && option.value) {
                    acc[option.variantTypes] = option.value;
                  }
                  return acc;
                },
                {} as Record<string, string>
              ),
            },
          })
        );
      }
    }
  }, [variants, dispatch]);

  const handleSelectVariants = (type: string, value: string) => {
    if (!current_selected || !current_selected.selected_variants) return;

    const newVariantOption = {
      ...current_selected.selected_variants,
      [type]: value,
    };

    const matchingVariant = variants?.find((variant: any) =>
      variant.variantOptions?.every(
        (option: any) => newVariantOption[option.variantTypes] === option.value
      )
    );

    if (matchingVariant) {
      dispatch(
        updateCurrentSelectedField({
          field: "selected_variants",
          value: newVariantOption,
        })
      );
      dispatch(
        updateCurrentSelectedField({
          field: "selected_price",
          value: matchingVariant.price,
        })
      );
      dispatch(
        updateCurrentSelectedField({
          field: "selected_sale_price",
          value: matchingVariant.salePrice,
        })
      );
      dispatch(
        updateCurrentSelectedField({
          field: "selected_quantity",
          value: matchingVariant.quantityAvailable,
        })
      );
      dispatch(
        updateCurrentSelectedField({
          field: "selected_images",
          value: matchingVariant.imageURLs || [],
        })
      );
    } else {
      dispatch(
        updateCurrentSelectedField({
          field: "selected_variants",
          value: newVariantOption,
        })
      );
    }
  };

  if (!variants || variants.length === 0) {
    return <div>No variants available</div>;
  }

  return (
    <div>
      <div className="flex items-start justify-between w-full">
        <div className="flex-grow">
          <Typography
            variant="h4"
            component="h2"
            className="text-[22px] font-semibold"
          >
            {name || "No name"}
          </Typography>
          <p className="font-medium text-sm text-gray-400 my-0">
            {(categories && categories[0]?.name) || "No categories"}
          </p>
        </div>
        <Stack className="w-[200px]">
          <p className="font-semibold my-0 text-[22px] text-right text-gray-600 line-through">
            ${current_selected?.selected_price?.toLocaleString() || "0"}
          </p>
          <p className="font-semibold text-lime my-0 text-[30px] text-right">
            ${current_selected?.selected_sale_price?.toLocaleString() || "0"}
          </p>
        </Stack>
      </div>
      <div className="flex flex-col item-center justify-start my-5">
        <div className="space-y-4">
          {options &&
            Object.entries(parseArrayToObject(product_details.options)).map(
              ([optionName, optionValues]) => (
                <div key={optionName} className="flex items-start space-x-4">
                  <span className="font-bold w-24">{optionName}:</span>
                  <div className="flex flex-wrap gap-2">
                    {Array.isArray(optionValues) &&
                      optionValues.map((value: string, index: number) => (
                        <span
                          key={index}
                          className={`px-3 py-1 font-normal rounded-full border-[1px] border-solid cursor-pointer ${
                            current_selected?.selected_variants?.[
                              optionName
                            ] === value
                              ? "border-black bg-black text-white"
                              : "border-gray-400"
                          }`}
                          onClick={() =>
                            handleSelectVariants(optionName, value)
                          }
                        >
                          {value}
                        </span>
                      ))}
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <div className="w-full flex items-center justify-start gap-1 mt-2">
        <IconInfoHexagon size={22} color="gray" />
        <span className="font-medium text-gray-500 text-sm">
          {current_selected?.selected_quantity || 0} item
          {current_selected?.selected_quantity !== 1 ? "s" : ""} left!
        </span>
      </div>
      <p className="mb-1 text-sm text-gray-500">Delivery on March 5th-11th</p>
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
          {like ? <IconHeartFilled size={18} /> : <IconHeart size={18} />}
        </div>
      </div>
    </div>
  );
};

export default ProductVariants;
