import React from "react";
import { Checkbox, FormControlLabel, FormGroup } from "@mui/material";

const ProdSellingType = () => (
  <div className="w-full rounded-lg mb-3 p-3">
    <p className="font-medium text-lg"> Selling Type </p>
    <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex gap-3">
      <FormGroup>
        <FormControlLabel
          control={<Checkbox defaultChecked />}
          label="In-store selling only"
        />
        <FormControlLabel control={<Checkbox />} label="Online selling only" />
        <FormControlLabel
          control={<Checkbox />}
          label="Available both online and in-store"
        />
      </FormGroup>
    </div>
  </div>
);

export default ProdSellingType;
