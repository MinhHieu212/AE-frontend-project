import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";

const ProdSellingType: React.FC<ProductFormProps> = ({
  formData,
  updateField,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    updateField("sellingType", event.target.value);
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg"> Selling Type </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 py-2 h-full flex gap-3">
        <FormGroup>
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.sellingType === "in-store"}
                onChange={handleChange}
                value="in-store"
              />
            }
            label="In-store selling only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.sellingType === "online"}
                onChange={handleChange}
                value="online"
              />
            }
            label="Online selling only"
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.sellingType === "both"}
                onChange={handleChange}
                value="both"
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
