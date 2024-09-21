import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
  Switch,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";

const ProdBranchFeature = () => {
  const useDispatch = useAppDispatch();
  const brand = useAppSelector((state) => state.product.brand);
  const isFeatured = useAppSelector((state) => state.product.isFeatured);
  const haveVariants = useAppSelector((state) => state.product.haveVariants);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Brand and Featured</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#aca4a4] text-sm">
            Product brand
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={brand || ""}
              onChange={(e) =>
                useDispatch(
                  updateProductField({
                    field: "brand",
                    value: String(e.target.value),
                  })
                )
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[42px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">{brand}</span>
                </Box>
              )}
              MenuProps={{
                PaperProps: {
                  style: {
                    maxHeight: 48 * 4.5 + 8,
                    width: 250,
                  },
                },
              }}
              displayEmpty
            >
              {phoneBrands.map((item, index) => (
                <MenuItem key={index} value={item}>
                  {item}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className="flex items-start justify-between mt-4">
          <div className="flex items-center justify-start gap-3 w-1/2">
            <label>
              <span
                aria-label="haveVariants"
                className="cursor-pointer text-[#aca4a4]"
              >
                Have variants <span className="text-red-600"> *</span>
              </span>
            </label>
            <Switch
              defaultChecked
              checked={haveVariants}
              id="haveVariants"
              onChange={(e) => {
                useDispatch(
                  updateProductField({
                    field: "haveVariants",
                    value: e.target.checked,
                  })
                );
                // if (e.target.checked)
                //   useDispatch(
                //     updateProductField({ field: "images", value: [] })
                //   );
              }}
            />
          </div>
          <div className="w-1/2 flex items-center justify-end">
            <span
              aria-label="isFeatured"
              className="cursor-pointer text-[#aca4a4]"
            >
              Featured product
            </span>
            <Checkbox
              checked={isFeatured}
              id="isFeatured"
              size="small"
              onClick={() =>
                useDispatch(
                  updateProductField({
                    field: "isFeatured",
                    value: !isFeatured,
                  })
                )
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdBranchFeature;

const phoneBrands = [
  "Apple",
  "Samsung",
  "Xiaomi",
  "Oppo",
  "Vivo",
  "Realme",
  "Huawei",
  "OnePlus",
  "Google",
  "Sony",
  "Nokia",
  "Motorola",
  "Asus",
  "Lenovo",
  "LG",
  "Tecno",
  "Infinix",
  "ZTE",
  "Honor",
  "Meizu",
];
