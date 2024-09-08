import React, { useEffect, useState } from "react";
import {
  Box,
  FormControl,
  MenuItem,
  OutlinedInput,
  Select,
} from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";
import { getCategories } from "../../../../api/CategoryApi";
import { fake_data_categorys } from "../../../../fake_data/fake_data_category";
import { toast } from "../../../../utils/Toastify";

interface CategoryProps {
  id: number;
  name: string;
  parentID: number | null;
  createdAt: string | null;
  updatedAt: string | null;
  subCategory: CategoryProps[];
  noOfViews: number;
  productsSold: number;
}

const ProdCategory: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
  const [subCategory, setSubCategory] = useState<any>([]);
  const [categories, setCategories] =
    useState<CategoryProps[]>(fake_data_categorys);

  const handleChange = (value: string, level: string) => {
    if (value === "") {
      updateField("category", {
        ...formData.category,
        [level]: { name: null, index: null },
      });
    } else {
      const values = value.split(" and ");
      updateField("category", {
        ...formData.category,
        [level]: { name: values[0], index: Number(values[1]) },
      });
    }
  };

  useEffect(() => {
    const selectedCategory = categories.find(
      (item) => item.name === formData.category.level_1.name
    );
    handleChange("", "level_2");
    setSubCategory(selectedCategory?.subCategory || []);
  }, [formData.category.level_1]);

  useEffect(() => {
    const callApi = async () => {
      try {
        const response_data = await getCategories();
        setCategories(response_data);
      } catch (error: any) {
        toast.error(error.message);
      }
    };
    callApi();
  }, []);

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">
        Category <span className="text-red-600"> *</span>
      </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 mb-1 text-[#aca4a4] text-sm">
            Product Category
            <span className="text-red-600"> *</span>
          </p>
          <FormControl className="w-full">
            <Select
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={formData.category.level_1}
              onChange={(e) => handleChange(String(e.target.value), "level_1")}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[42px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">
                    {formData.category.level_1.name}
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
              {categories.map((item) => (
                <MenuItem key={item.id} value={`${item.name} and ${item.id}`}>
                  {item.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          {startValidate && errors.category && (
            <p className="my-2 text-[#f12727] text-sm">
              {startValidate && errors.category}
            </p>
          )}
        </div>

        <div>
          <p className="my-0 mb-1 text-[#aca4a4] text-sm">
            Product Sub-category
          </p>
          <FormControl className="w-full">
            <Select
              disabled={subCategory.length === 0}
              id="demo-multiple-chip"
              inputProps={{ "aria-label": "Without label" }}
              value={formData.category.level_2}
              onChange={(e) => handleChange(String(e.target.value), "level_2")}
              input={<OutlinedInput id="select-multiple-chip" />}
              className="h-[42px] w-full cursor-pointer"
              renderValue={() => (
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                  <span className="text-sm font-medium">
                    {formData.category.level_2.name}
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
                <MenuItem key={item.id} value={`${item.name} and ${item.id}`}>
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
