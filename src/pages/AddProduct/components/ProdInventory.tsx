import React from "react";
import { TextField } from "@mui/material";
import { ProductFormProps } from "../types/ProductFormProps";

const ProdInventory: React.FC<ProductFormProps> = ({
  formData,
  updateField,
}) => {
  return (
    <div className="w-full rounded-lg mb-2 p-3">
      <p className="font-medium text-lg">Inventory</p>
      <div className="border-2  border-solid border-gray-200 rounded-lg p-5 h-full flex  gap-3">
        <div className="w-1/2">
          <p className="my-0 pb-1 text-[#cac4c4] text-sm">Quantity</p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            className="pb-4"
            type="number"
            value={formData.inventory.quantity}
            onChange={(e) =>
              updateField("inventory", {
                ...formData.inventory,
                quantity: Number(e.target.value),
              })
            }
          />
        </div>
        <div className="w-1/2">
          <p className="my-0 pb-1 text-[#cac4c4] text-sm">SKU (optional)</p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            className="pb-4"
            value={formData.inventory.sku}
            onChange={(e) =>
              updateField("inventory", {
                ...formData.inventory,
                sku: e.target.value,
              })
            }
          />
        </div>
      </div>
    </div>
  );
};

export default ProdInventory;
