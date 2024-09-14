import React from "react";
import {
  Box,
  Checkbox,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";

const ProdBranchFeature = () => {
  const useDispatch = useAppDispatch();
  const branch = useAppSelector((state) => state.product.branch);
  const isFeatured = useAppSelector((state) => state.product.isFeatured);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Branch and Featured</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#aca4a4] text-sm">
            Product Branch
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={branch}
              onChange={(e) =>
                useDispatch(
                  updateProductField({
                    field: "branch",
                    value: String(e.target.value),
                  })
                )
              }
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[42px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">{branch}</span>
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
        <div className="mt-4">
          <p className="my-0 text-[#aca4a4] text-sm">Is Featured</p>
          <Checkbox
            checked={isFeatured}
            onClick={() =>
              useDispatch(
                updateProductField({ field: "isFeatured", value: !isFeatured })
              )
            }
          />
          <span>
            Featured item, giving it higher visibility on the homepage.
          </span>
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
