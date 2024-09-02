import React from "react";
import { TextField } from "@mui/material";

const ProdInventory = () => (
  <div className="w-full rounded-lg mb-3 p-3">
    <p className="font-medium text-lg">Inventory</p>
    <div className="border-2  border-solid border-gray-200 rounded-lg p-5 h-full flex  gap-3">
      <div className="w-1/2">
        <p className="my-0 text-[#cac4c4] text-sm">Quantity</p>
        <TextField
          variant="outlined"
          fullWidth
          required
          size="small"
          className="pb-4"
          type="number"
        />
      </div>
      <div className="w-1/2">
        <p className="my-0 text-[#cac4c4] text-sm">SKU (optional)</p>
        <TextField
          variant="outlined"
          fullWidth
          required
          size="small"
          className="pb-4"
        />
      </div>
    </div>
  </div>
);

export default ProdInventory;
