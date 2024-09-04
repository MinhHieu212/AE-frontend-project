import * as React from "react";
import Backdrop from "@mui/material/Backdrop";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Fade from "@mui/material/Fade";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { PopupProductFormProps } from "../types/ProductFormProps";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 700,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PopupImages: React.FC<PopupProductFormProps> = ({
  formData,
  updateField,
  errors,
  startValidate,
  setImageList,
}) => {
  const [open, setOpen] = React.useState(false);
  const [primaryIndex, setPrimaryIndex] = React.useState(0);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleImageClick = (index: number) => {
    setPrimaryIndex(index);
    updateField("primaryImage", formData.images[index]);
  };

  const handleDeleteImage = (index: number) => {
    const newImages = formData.images.filter((_, i) => i !== index);
    updateField("images", newImages);
    setImageList(newImages);

    if (index === primaryIndex) {
      setPrimaryIndex(0);
      updateField("primaryImage", newImages.length > 0 ? newImages[0] : "");
    } else if (index < primaryIndex) {
      setPrimaryIndex(primaryIndex - 1);
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>
        <span style={{ margin: "0 10px", color: "green" }}>
          ({formData.images.length}/10)
        </span>
        View all
      </Button>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography
              id="transition-modal-title"
              variant="h6"
              component="h2"
              className="capitalize "
            >
              Product Images
              <span
                style={{
                  margin: 0,
                  paddingLeft: 5,
                  color: "blue",
                  fontSize: "16px",
                }}
              >
                (Select image for Thumbnail)
              </span>
            </Typography>

            <Box className="w-full">
              {formData.images.length > 0 && (
                <img
                  src={formData.images[primaryIndex].url}
                  alt="Primary"
                  style={{
                    width: "100%",
                    height: "350px",
                    objectFit: "contain",
                    border: "2px solid blue",
                  }}
                />
              )}
            </Box>
            <Box className="w-full">
              <ImageList
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  overflowX: "auto",
                }}
                cols={formData.images.length}
              >
                {formData.images.length > 0 &&
                  formData.images.map((image, index) => (
                    <ImageListItem key={index}>
                      <Box sx={{ position: "relative", margin: "0 5px" }}>
                        <img
                          src={image.url}
                          alt={`Image ${index + 1}`}
                          style={{
                            width: "100px",
                            height: "100px",
                            objectFit: "cover",
                            cursor: "pointer",
                            border:
                              index === primaryIndex
                                ? "2px solid blue"
                                : "none",
                          }}
                          onClick={() => handleImageClick(index)}
                        />
                        <IconButton
                          size="small"
                          sx={{
                            position: "absolute",
                            top: "2px",
                            right: "2px",
                            backgroundColor: "rgba(246, 221, 221, 0.8)",
                          }}
                          onClick={() => handleDeleteImage(index)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      </Box>
                    </ImageListItem>
                  ))}
              </ImageList>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
};

export default PopupImages;
