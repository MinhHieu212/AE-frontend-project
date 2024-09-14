import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { ImageFile, PopupProductFormProps } from "../types/ProductFormProps";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconStarFilled } from "@tabler/icons-react";
import { Chip, FormControl, FormLabel, RadioGroup, Stack } from "@mui/material";
import { useAppSelector } from "../../../../store/store";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "1200px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxWidth: "none",
    width: "1200px",
    height: "600px",
  },
}));

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

const NewPopupImages: React.FC<PopupProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
  setImageList,
  openModal,
  setOpenModal,
  imageInputRef,
}) => {
  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  const handleAddMore = (acceptedFiles: FileList | null) => {
    if (!acceptedFiles) return;

    const newFiles = Array.from(acceptedFiles).map((file) => ({
      file,
      url: URL.createObjectURL(file),
    }));

    const prev_images = formData.images || [];
    updateField("images", [...prev_images, ...newFiles]);
  };

  const handleRemoveImage = (url: string) => {
    const newImageList = formData.images.filter((item) => item.url !== url);
    updateField("images", newImageList);
  };

  const handleSetPrimaryImage = (file: ImageFile) => {
    updateField("primaryImage", file);
  };

  return (
    <React.Fragment>
      {formData.images?.length > 0 && (
        <Button onClick={handleClickOpen} className="capitalize">
          Set Image label
        </Button>
      )}
      <BootstrapDialog onClose={handleClose} open={openModal}>
        <DialogTitle sx={{ m: 0, p: 2 }}>All Images</DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: "absolute",
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <CloseIcon />
        </IconButton>
        <DialogContent dividers>
          <div className="flex items-start justify-between w-full">
            <div className="w-2/5 p-4">
              {formData.images.length > 0 && (
                <img
                  src={formData.primaryImage?.url || formData.images[0].url}
                  alt={`Image file`}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>

            <div className="w-3/5 p-3 flex items-start justify-start flex-wrap">
              {formData.images.map((item, index) => {
                return (
                  <div className="w-1/4 max-h-[120px] p-2 relative" key={index}>
                    <img
                      src={item.url}
                      alt={`Image file ${item.file.name}`}
                      className="w-full h-full object-cover rounded-lg"
                      onClick={() => handleSetPrimaryImage(item)}
                    />
                    {formData?.primaryImage &&
                    formData?.primaryImage.url === item.url ? (
                      <div className="absolute top-0 right-0 w-[25px] h-[25px] cursor-pointer">
                        <IconStarFilled color="blue" />
                      </div>
                    ) : (
                      <div
                        className="absolute top-0 right-0 w-[25px] h-[25px] flex items-center justify-center font-medium bg-opacity-45 bg-gray-500 rounded-full cursor-pointer"
                        onClick={() => handleRemoveImage(item.url)}
                      >
                        X
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </DialogContent>
        <DialogActions>
          {formData.images.length < 10 && (
            <Button
              component="label"
              role={undefined}
              tabIndex={-1}
              startIcon={<CloudUploadIcon />}
            >
              Add Images
              <VisuallyHiddenInput
                type="file"
                onChange={(event) => handleAddMore(event.target.files)}
                multiple
              />
            </Button>
          )}
          <Button autoFocus onClick={handleClose}>
            Close
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </React.Fragment>
  );
};

export default NewPopupImages;
