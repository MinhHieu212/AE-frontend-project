import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import DialogTitle from "@mui/material/DialogTitle";
import { useAppSelector } from "../../../../store/store";
import { styled } from "@mui/material";
import { Box, Typography, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import { PlusOne, Upload, X } from "@mui/icons-material";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(3),
    width: "800px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(2),
  },
  "& .MuiPaper-root": {
    maxWidth: "none",
    width: "800px",
    borderRadius: "12px",
  },
}));

interface PopupVariantImagesProps {
  open: boolean;
  setOpen: (value: boolean) => void;
  id: number;
  type: string;
  values: string[];
}

export default function PopupVariantImages({
  open,
  setOpen,
  id,
  type,
  values,
}: PopupVariantImagesProps) {
  const [images, setImages] = React.useState<{ [key: string]: File[] }>({});

  const handleFileChange =
    (value: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (event.target.files) {
        const newFiles = Array.from(event.target.files);
        setImages((prev) => ({
          ...prev,
          [value]: [...(prev[value] || []), ...newFiles],
        }));
      }
    };

  const handleRemoveImage = (value: string, index: number) => {
    setImages((prev) => ({
      ...prev,
      [value]: prev[value].filter((_, i) => i !== index),
    }));
  };

  const handleUpload = () => {
    console.log("Uploading images:", images);
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="outlined"
        startIcon={<CloudUploadIcon />}
        onClick={() => setOpen(true)}
        className="w-1/5 capitalize"
        color="primary"
      >
        Upload Images
      </Button>
      <BootstrapDialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle className="text-lg font-semibold">
          Upload Variant Images
          <Button
            onClick={() => setOpen(false)}
            className="absolute right-2 top-2 p-2"
          >
            <X className="h-4 w-4" />
          </Button>
        </DialogTitle>
        <DialogContent className="sm:max-w-[800px]">
          <div className="space-y-6">
            {values.map((value) => (
              <div key={value} className="space-y-2">
                <p className="font-medium">
                  <span className="font-bold uppercase"> {type} </span>: {value}
                </p>
                <div className="grid grid-cols-4 gap-4">
                  {images[value]?.map((file, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={URL.createObjectURL(file)}
                        alt={`Preview ${index + 1}`}
                        className="w-full h-32 object-cover rounded-lg"
                      />
                      <Box
                        onClick={() => handleRemoveImage(value, index)}
                        className="absolute top-1 right-1 text-black rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="h-4 w-4" />
                      </Box>
                    </div>
                  ))}
                  <label
                    htmlFor={`file-${value}`}
                    className="border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center h-32 cursor-pointer hover:bg-gray-50 transition-colors"
                  >
                    <input
                      type="file"
                      id={`file-${value}`}
                      accept="image/*"
                      multiple
                      onChange={handleFileChange(value)}
                      className="hidden"
                    />
                    <PlusOne className="h-8 w-8 text-gray-400" />
                  </label>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 flex justify-end space-x-2">
            <Button onClick={() => setOpen(false)} variant="outlined">
              Close
            </Button>
            <Button onClick={handleUpload}>Upload All</Button>
          </div>
        </DialogContent>
      </BootstrapDialog>
    </>
  );
}
