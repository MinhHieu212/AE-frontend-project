import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";

const ProdSellingType = () => {
  const useDispatch = useAppDispatch();
  const sellingType = useAppSelector((state) => state.product.sellingType);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    useDispatch(
      updateProductField({ field: "sellingType", value: event.target.value })
    );
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">
        Selling Type <span className="text-red-600"> *</span>
      </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 py-2 h-full flex gap-3">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "In-store selling only"}
                onChange={handleChange}
                size="small"
                value="In-store selling only"
              />
            }
            label="In-store selling only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "Online selling only"}
                onChange={handleChange}
                value="Online selling only"
                size="small"
              />
            }
            label="Online selling only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={sellingType === "Available both online and in-store"}
                size="small"
                onChange={handleChange}
                value="Available both online and in-store"
              />
            }
            label="Available both online and in-store"
          />
        </FormGroup>
      </div>
    </div>
  );
};

export default ProdSellingType;
