import React from "react";
import { TextField, InputAdornment, Box } from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";

const ProdPricing: React.FC<ProductFormProps> = ({ formData, updateField }) => {
  // Handler to update fields in formData
  const handleChange = (field: string, value: string | number) => {
    updateField("pricing", {
      ...formData.pricing,
      [field]: value,
    });
  };

  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg"> Pricing </p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div className="w-full flex items-center justify-between gap-5 mb-2">
          {["MSRP Price", "Sale Price"].map((label, index) => (
            <div key={label} className="w-full">
              <p className="my-0 pb-1 text-[#cac4c4] text-sm">{label}</p>
              <TextField
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box className="w-[35px] h-[35px] bg-[#ebedf1] rounded-md flex items-center text-black justify-center">
                          $
                        </Box>
                      </InputAdornment>
                    ),
                    style: {
                      padding: "0 4px",
                    },
                  },
                }}
                type="number"
                size="small"
                variant="outlined"
                placeholder="00.00"
                className="w-full rounded-md"
                value={
                  index === 0
                    ? formData.pricing.msrp
                    : formData.pricing.salePrice
                }
                onChange={(e) =>
                  handleChange(
                    index === 0 ? "msrp" : "salePrice",
                    parseFloat(e.target.value) || 0
                  )
                }
              />
            </div>
          ))}
        </div>
        <div>
          <p className="my-0 pb-1 text-[#cac4c4] text-sm">Price</p>
          <TextField
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <Box className="w-[35px] h-[35px] bg-[#ebedf1] rounded-md flex items-center text-black justify-center">
                      $
                    </Box>
                  </InputAdornment>
                ),
                style: {
                  padding: "0 4px",
                },
              },
            }}
            type="number"
            size="small"
            variant="outlined"
            placeholder="00.00"
            className="w-full rounded-md"
            value={formData.pricing.price}
            onChange={(e) =>
              handleChange("price", parseFloat(e.target.value) || 0)
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProdPricing;
