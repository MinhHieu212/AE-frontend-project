import React, { useState } from "react";
import { ProductFormProps } from "../types/ProductFormProps";
import {
  Divider,
  InputBase,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";

const ProdPackages: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
  // State for unit (Kg/Pound)
  const [unit, setUnit] = useState(formData.packages_weight ? "Kg" : "Pound");

  // Handler to update weight
  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(event.target.value) || 0;
    updateField("packages_weight", weight); // Update the weight in formData
  };

  // Handler to update unit
  const handleUnitChange = (value: string) => {
    setUnit(value);
  };

  // Handler to update package size dimensions
  const handleSizeChange =
    (dimension: "length" | "width" | "height") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value) || 0;
      updateField("packages_size", {
        ...formData.packages_size,
        [dimension]: value,
      });
    };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg"> Shiping and Delivery </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 pb-1 text-[#aca4a4] text-sm">Item weight</p>
          <div className="w-full flex items-center justify-between px-1 border-2 h-[42px] border-solid border-[#c8c3c3] rounded-md">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="00.00"
              type="number"
              className="h-[42px]"
              value={formData.packages_weight || ""} // Bind to formData
              onChange={handleWeightChange} // Handle weight change
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Select
              value={unit}
              onChange={(e) => handleUnitChange(e.target.value)}
              size="small"
              className="outline-none"
              sx={{
                "& .MuiOutlinedInput-notchedOutline": {
                  border: "none",
                  height: "42px",
                },
              }}
            >
              <MenuItem value="Kg">Kg</MenuItem>
              <MenuItem value="Pound">Pb</MenuItem>
            </Select>
          </div>
          {startValidate && errors.packages_weight && (
            <p className="my-0 text-[#f12727] text-sm">
              {startValidate && errors.packages_weight}
            </p>
          )}
        </div>
        <div>
          <p className="font-medium"> Package Size</p>
          <div className="flex item-start justify-between gap-5">
            {["length", "width", "height"].map((dim) => (
              <div
                key={dim}
                className="flex items-start justify-center flex-col w-1/3"
              >
                <p className="my-0 pb-1 text-[#aca4a4] text-sm">
                  {dim.charAt(0).toUpperCase() + dim.slice(1)}
                </p>
                <TextField
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">In</InputAdornment>
                      ),
                    },
                  }}
                  size="small"
                  variant="outlined"
                  placeholder="00.00"
                  className="w-full rounded-md"
                  value={
                    formData.packages_size[
                      dim as keyof typeof formData.packages_size
                    ] || ""
                  }
                  onChange={handleSizeChange(
                    dim as "length" | "width" | "height"
                  )}
                />
                {errors[`packages_weight.${dim}`] && (
                  <p className="my-0 text-[#f12727] text-sm">
                    {errors[`packages_weight.${dim}`]}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdPackages;
