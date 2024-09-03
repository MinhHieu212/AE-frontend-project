import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";

const ProdSellingType: React.FC<ProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("sellingType", event.target.value);
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
                checked={formData.sellingType === "In-store selling only"}
                onChange={handleChange}
                value="In-store selling only"
              />
            }
            label="In-store selling only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.sellingType === "Online selling only"}
                onChange={handleChange}
                value="Online selling only"
              />
            }
            label="Online selling only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={
                  formData.sellingType === "Available both online and in-store"
                }
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
