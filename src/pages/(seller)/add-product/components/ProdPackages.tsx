import React, { useState } from "react";
import {
  Divider,
  InputBase,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";
import { updateProductField } from "../../../../store/slices/productSlice";
import { useAppDispatch, useAppSelector } from "../../../../store/store";

const ProdPackages = () => {
  const useDispatch = useAppDispatch();
  const packages_weight = useAppSelector(
    (state) => state.product.packages_weight
  );
  const packages_size = useAppSelector((state) => state.product.packages_size);
  const [unit, setUnit] = useState(packages_weight ? "Kg" : "Pound");

  function updateField(field: string, value: any) {
    useDispatch(updateProductField({ field, value }));
  }

  const handleWeightChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const weight = parseFloat(event.target.value) || 0;
    updateField("packages_weight", weight);
  };

  const handleUnitChange = (value: string) => {
    setUnit(value);
  };

  const handleSizeChange =
    (dimension: "length" | "width" | "height") =>
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = parseFloat(event.target.value) || null;
      updateField("packages_size", {
        ...packages_size,
        [dimension]: value,
      });
    };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg"> Shiping and Delivery </p>
      <div className="border-2 border-solid border-gray-200 shadow-sm rounded-lg p-5 h-full flex flex-col gap-3 mt-5">
        <div>
          <p className="my-0 pb-1 text-[#aca4a4] text-sm">Item weight</p>
          <div className="w-full flex items-center justify-between px-1 border-[1px] h-[40px] border-solid border-[#c8c3c3] rounded-md">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="00.00"
              type="number"
              className="h-[40px]"
              value={packages_weight || ""}
              onChange={handleWeightChange}
              onKeyDown={(e) => {
                if (e.key === "-" || e.key === ",") {
                  e.preventDefault();
                  return;
                }
              }}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Select
              value={unit || ""}
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
        </div>
        <div>
          <div className="flex item-start justify-between gap-5 mt-4">
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
                  value={packages_size[dim as keyof typeof packages_size] || ""}
                  onChange={handleSizeChange(
                    dim as "length" | "width" | "height"
                  )}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProdPackages;
