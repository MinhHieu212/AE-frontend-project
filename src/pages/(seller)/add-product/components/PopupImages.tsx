import * as React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { IconStarFilled } from "@tabler/icons-react";
import { useAppDispatch, useAppSelector } from "../../../../store/store";
import { updateProductField } from "../../../../store/slices/productSlice";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
    width: "1300px",
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  "& .MuiPaper-root": {
    maxWidth: "none",
    width: "1300px",
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

export interface ImageFile {
  file: File;
  url: string;
}

export interface Popupproduct_types {
  openModal: boolean;
  setOpenModal: (value: boolean) => void;
}

const PopupImages: React.FC<Popupproduct_types> = ({
  openModal,
  setOpenModal,
}) => {
  const useDispatch = useAppDispatch();
  const images = useAppSelector((state) => state.product.images);
  const primaryImage = useAppSelector((state) => state.product.primaryImage);

  function updateField(field: string, value: any) {
    useDispatch(updateProductField({ field, value }));
  }

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

    const prev_images = images || [];
    updateField("images", [...prev_images, ...newFiles]);
  };

  const handleRemoveImage = (url: string) => {
    const newImageList = images.filter((item) => item.url !== url);
    updateField("images", newImageList);
  };

  const handleSetPrimaryImage = (file: ImageFile) => {
    updateField("primaryImage", file);
  };

  return (
    <React.Fragment>
      {images?.length > 0 && (
        <Button onClick={handleClickOpen} className="capitalize">
          View Images
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
            <div className="w-2/5 p-3">
              {images.length > 0 && (
                <img
                  src={primaryImage?.url || images[0].url}
                  alt={`Image file`}
                  className="w-full h-full object-cover rounded-lg"
                />
              )}
            </div>

            <div className="w-3/5 p-3 flex items-start justify-start flex-wrap gap-2">
              {images.map((item, index) => {
                return (
                  <div
                    className={`w-1/4 h-[120px] p-2 relative ${
                      primaryImage?.url === item.url
                        ? "border-[#8f8ff6]  border-[2px] border-solid"
                        : "border-[#aaaaaa]  border-[1px]  border-dashed"
                    } overflow-hidden rounded-md`}
                    key={index}
                  >
                    <img
                      src={item.url}
                      alt={`Image file ${item.file.name}`}
                      className="w-full h-full object-cover rounded-lg"
                      onClick={() => handleSetPrimaryImage(item)}
                    />
                    {primaryImage && primaryImage?.url === item.url ? (
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
          {images.length < 10 && (
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
                accept="image/*"
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

export default PopupImages;
