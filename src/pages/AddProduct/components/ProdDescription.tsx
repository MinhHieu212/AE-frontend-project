import { IconUpload } from "@tabler/icons-react";
import React, { useState } from "react";
import Button from "@mui/material/Button";
import { TextField } from "@mui/material";
import { styled } from "@mui/material/styles";

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

const ProdDescription = () => {
  const [businessDescription, setBusinessDescription] = useState("");
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target?.result as string;

        setBusinessDescription(content);
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
          />
        </div>
        <div>
          <div className="flex items-center justify-between gap-3 ">
            <p className="my-0 text-[#cac4c4] text-sm">Business Description</p>
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
                onChange={handleFileUpload}
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
            value={businessDescription}
            onChange={(e) => setBusinessDescription(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ProdDescription;
