import React, { useState } from "react";
import {
  Divider,
  InputBase,
  MenuItem,
  Select,
  TextField,
  InputAdornment,
} from "@mui/material";

const ProdPackages = () => {
  const [unit, setUnit] = useState("Kg");

  return (
    <div className="w-full rounded-lg mb-3 p-3">
      <p className="font-medium text-lg"> Package Info</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 text-[#cac4c4] text-sm">Item weight</p>
          <div className="w-full flex items-center justify-between px-1 border-2 h-[42px] border-solid border-[#c8c3c3] rounded-md">
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="00.00"
              type="number"
              className="h-[42px]"
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <Select
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
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
          <p className="font-medium"> Package Size</p>
          <div className="flex item-start justify-between gap-5">
            {["Length", "Breath", "Width"].map((dim) => (
              <div
                key={dim}
                className="flex items-start justify-center flex-col w-1/3"
              >
                <p className="my-0 text-[#cac4c4] text-sm">{dim}</p>
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
