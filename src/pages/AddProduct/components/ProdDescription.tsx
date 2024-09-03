import React, { useState } from "react";
import { Button, TextField } from "@mui/material";
import { styled } from "@mui/material/styles";
import { ProductFormProps } from "../types/ProductFormProps";
import { IconUpload } from "@tabler/icons-react";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ProdDescription: React.FC<ProductFormProps> = ({
  formData,
  updateField,
}) => {
  const handleParseTxtFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;
        updateField("description", content);
      };
      reader.readAsText(file);
    } else {
      alert("Please upload a valid .txt file.");
    }
  };

  return (
    <div className="w-full flex flex-col rounded-lg mb-3 p-3">
      <p className="font-medium text-lg">Description</p>
      <div className="border-2 border-solid border-gray-200 rounded-lg p-5 h-full flex flex-col gap-3">
        <div>
          <p className="my-0 text-[#cac4c4] text-sm">Product name</p>
          <TextField
            variant="outlined"
            fullWidth
            required
            size="small"
            className="pb-4"
            value={formData.name}
            onChange={(e) => updateField("name", e.target.value)}
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 ">
            <p className="my-0 pb-1 text-[#cac4c4] text-sm">
              Business Description
            </p>
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              className="capitalize"
              startIcon={<IconUpload size={22} className="mb-[1px]" />}
            >
              Upload .txt files
              <VisuallyHiddenInput
                type="file"
                onChange={handleParseTxtFile}
                accept=".txt"
                multiple
              />
            </Button>
          </div>
          <TextField
            variant="outlined"
            fullWidth
            multiline
            rows={8}
            required
            size="small"
            value={formData.description}
            onChange={(e) => updateField("description", e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;
