import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";
import { fake_data_categorys } from "../../../data/fake_data_category";

const ProdCategory: React.FC<ProductFormProps> = ({
  formData,
  updateField,
}) => {
  const [subCategory, setSubCategory] = useState<any>([]);

  const handleChange = (value: string, level: string) => {
    updateField("category", { ...formData.category, [level]: value });
  };

  useEffect(() => {
    const selectedCategory = fake_data_categorys.find(
      (item) => item.name === formData.category.level_1
    );
    handleChange("", "level_2");
    setSubCategory(selectedCategory?.subCategory || []);
  }, [formData.category.level_1]);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Category</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#cac4c4] text-sm">Product Category</p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={formData.category.level_1}
              onChange={(e) => handleChange(e.target.value, "level_1")}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[42px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium text-[gray]">
                    {formData.category.level_1}
                  </span>
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
              {fake_data_categorys.map((item) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div>
          <p className="my-0 mb-1 text-[#cac4c4] text-sm">
            Product Sub-category
          </p>
          <FormControl className="w-full">
            <Select
              disabled={subCategory.length === 0}
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={formData.category.level_2}
              onChange={(e) => handleChange(e.target.value, "level_2")}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[42px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium text-[gray]">
                    {formData.category.level_2}
                  </span>
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
              {subCategory.map((item: any) => (
                <MenuItem key={item.id} value={item.name}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>
    </div>
  );
};

export default ProdCategory;
